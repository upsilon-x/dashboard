import React, { useContext, useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import { Grid, Button, Card, InputLabel, TextField, Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
import DappContext from "../../Context/DappContext";
import ValidatedInput from "../../Components/Form/ValidatedInput";
import { useEthers } from '@usedapp/core';
import ENV_VAR from "../../../ENV_VAR.json";
import firebase from 'firebase';
import Link from "next/link";
import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';

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

  const onSubmit = function (data) {
    console.log(data);

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
        data.storeImages = urls;
        // 2. do API request
        firebase.auth().currentUser.getIdToken()
          .then(async token => {
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
          });
      })
  }
  const { selectedProject, projects } = useContext(DappContext);
  const { account, chainId } = useEthers();

  return (
    <PageContainer heading={<IntlMessages id="pages.storePage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={8}>
          <Card style={{ padding: "16px 16px" }}>
            {/* Make a simple form here. Shouldn't be too hard. Video, images, etc */}
            {/* Buttons: Go to Store Page / Add NFTs to Sell */}
            {/* TODO: make a general style for forms */}
            {projects == null || projects[selectedProject] == null ?
              <section>
                <div>Please select a valid project before making a store copy.</div>
                <Link href="projects">
                  <Button color="primary" variant="contained" size="small" className='mt-2' >
                    Go to Projects Page
                  </Button>
                </Link>
              </section>
              :
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
                <div>
                  <Button className="mr-2 mb-2" variant="contained" type="submit">
                    Submit Changes
                  </Button>
                </div>
              </form>
            }
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