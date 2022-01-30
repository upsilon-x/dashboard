import React, { useContext, useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import { Grid, Button, Card, InputLabel, TextField, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import DappContext from "../../Context/DappContext";
import ValidatedInput from "../../Components/Form/ValidatedInput";
import ValidatedSelect from "../../Components/Form/ValidatedSelect";
import { useEthers } from '@usedapp/core';
import ENV_VAR from "../../../ENV_VAR.json";
import firebase from 'firebase';
import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';
import RequireSetProject from '../../Components/RequireSetProject';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Store Page', isActive: true },
];
/**
 * https://www.npmjs.com/package/react-images-uploading
 * https://bestofreactjs.com/repo/TPMinan-react-upload-gallery-react-image
 * 
 */

const StorePage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

  const [submitting, setSubmitting] = useState(false);
  const onSubmit = function (data) {
    console.log(data);
    setSubmitting("Uploading images...");

    // 1. upload storeImages
    function putStorageItem(item) {
      return new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random() * 1000000000000);
        firebase.storage()
          .ref(`/storeImages/${account}/storepage/${rand}-${item.name}/`)
          .put(item)
          .then((snapshot) => {
            console.log('One success:', item)
            return snapshot.ref.getDownloadURL();
          })
          .catch((error) => {
            console.log('One failed:', item, error.message)
            reject();
          })
          .then(url => resolve(url));
      });
    }
    Promise.all([...data.storeImages].map(item => putStorageItem(item)))
      .then((urls) => {
        console.log(urls);
        setSubmitting("Updating store page...");
        data.storeImages = urls;
        // 2. do API request
        firebase.auth().currentUser.getIdToken()
          .then(token => {
            console.log(token); //reference create.js in Projects folder
            return fetch(`${functionsURL}/editStorePage`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify(data)
            })
          })
          .then(res => {
            setSubmitting(false);
          })
          .catch(res => {
            setSubmitting("There was an error! Please reset");
          });
      })
  }

  const { selectedProject, projects } = useContext(DappContext);
  const { account, chainId } = useEthers();
  const [releases, setReleases] = useState(null);

  // Gets all of the releases to be used in the form
  if (releases == null && projects != null && projects[selectedProject] != null) {
    setReleases(false);
    fetch(`${functionsURL}/getReleases`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nftId: projects[selectedProject].nftId,
        chainId: chainId
      })
    })
      .then((response) => response.json())
      .then(res => {
        console.log(res);
        let options = [{ value: -1, name: "No Release" }];
        res.map(x => {
          console.log(x);
          options.push({
            value: x.releaseId,
            name: "v" + x.version + (x.status === "Live" ? " (Current)" : ""),
          });
        });
        console.log(options);
        setReleases(options);
      });
  }




  return (
    <PageContainer heading={<IntlMessages id="pages.storePage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={8}>
          <Card style={{ padding: "16px 16px" }}>
            {/* Buttons: Go to Store Page / Add NFTs to Sell */}
            {/* TODO: make a general style for forms */}
            <RequireSetProject>
              {releases == null || releases === false ?
                <section>
                  <div>Fetching releases. Please hold...</div>
                </section>
                : submitting !== false ?
                  <section>
                    <div>Submitting your game's awesomeness. Please hold. {submitting}</div>
                  </section> :
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" id="chainId" {...register("chainId")} value={chainId} />
                    <input type="hidden" id="nftId" {...register("nftId")}
                      value={projects[selectedProject].nftId}
                    />
                    <ValidatedInput errors={errors} register={register}
                      inputId="title" inputType="text"
                      label="*Display Title:"
                      validation={{ required: true, maxLength: 50, minLength: 3 }}
                      defaultValue={projects[selectedProject].title ?? ""}
                    />
                    <ValidatedInput errors={errors} register={register}
                      inputId="blurb" inputType="text" multiline
                      label="*Blurb:"
                      validation={{ required: true, maxLength: 150, minLength: 10 }}
                      defaultValue={projects[selectedProject].blurb ?? ""}
                    />
                    <ValidatedInput errors={errors} register={register}
                      inputId="trailer" inputType="url"
                      label="Youtube Trailer:"
                      defaultValue={projects[selectedProject].trailer ?? ""}
                    />
                    <ValidatedInput errors={errors} register={register}
                      inputId="audit" inputType="url"
                      label="Audit:"
                      defaultValue={projects[selectedProject].audit ?? ""}
                    />
                    {/* TODO: Make the images orderable */}
                    <ValidatedInput errors={errors} register={register}
                      inputId="storeImages" multiple
                      label="*Store Images:" inputType="multiple"
                      validation={{ required: true, max: 8, min: 2 }}
                    />
                    {/* TODO: Replace with markdown */}
                    <ValidatedInput errors={errors} register={register}
                      inputId="description" multiline textfield
                      label="*Description:"
                      validation={{ required: true, maxLength: 10000, minLength: 100 }}
                      defaultValue={projects[selectedProject].description ?? ""}
                    />
                    <ValidatedSelect errors={errors} register={register}
                      inputId="releaseId"
                      options={releases} label="Select Release:"
                      validation={{ required: true }}
                      defaultValue={projects[selectedProject].releaseId}
                    />
                    <div>
                      <Button className="mr-2 mb-2" variant="contained" type="submit">
                        Submit Changes
                      </Button>
                    </div>
                  </form>
              }
            </RequireSetProject>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card style={{ padding: "16px 16px" }}>
            <IntlMessages id="pages.storePage.description" />
            <Button className="mr-2 mt-2 mb-2" variant="contained">Publish Store Page</Button>
            <Button className="mr-2 mb-2" variant="contained">Go to Store Page</Button>
            <Button className="mr-2 mb-2" variant="contained">Import NFTs</Button>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default StorePage;

/*
                <RUG
                  action="http://projectisheldtogetherbyducktape.com/upload"
                  customRequest={(data) => {
                    console.log("CUSTOM REQUEST 1", data);
                    const { uid, action, file, onProgress, onSuccess, onError } = data;

                    try {
                      firebase.auth().currentUser.getIdToken()
                      .then(async token => {
                        const rand = Math.floor(Math.random() * 1000000000000);
                        const uploadTask = firebase.storage()
                          .ref(`/storeImages/${account}/storepage/${rand}-${file.name}/`)
                          .put(file);
                        return await new Promise(function (resolve, reject) {
                          uploadTask.on('state_changed', 
                            function progress(snapshot) { 
                              console.log("Progress!", uid, snapshot);
                              onProgress(uid, snapshot);
                            }, 
                            function error(err) { 
                              console.log("Error!", uid, err);
                              onError(uid, err);
                              reject()
                            }, 
                            function complete() {
                              console.log(uploadTask);
                              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL));
                          });
                        });
                      })
                      .then(async downloadURL => {
                        console.log("Success!", uid, downloadURL);
                        setImageURLs({...imageURLs, uid: downloadURL });

                        // lol
                        onSuccess(uid, { status: 200 })
                      })
                    }
                    catch(e) {
                      console.log("Error:", e);
                      alert("There was an error with the image upload!");
                    }
                    
                    // https://github.com/m-inan/react-upload-gallery/blob/master/examples/CustomRequest.js
                    // this project is held together by duck tape
                    return { dummy() {} }
                  }}
                  rules={{
                    limit: 8,
                    width: { min: 1280, max: 1920 },
                    height: { min: 720, max: 1080 }
                  }}
                  accept={['jpg', 'jpeg', 'png']}
                />
*/