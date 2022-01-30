import React, { useState, useContext } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { Button, Card } from '@material-ui/core';
import { useForm } from "react-hook-form";
import ValidatedInput from "../../Components/Form/ValidatedInput";
import DappContext from "../../Context/DappContext";
import ENV_VAR from "../../../ENV_VAR.json";
import { useEthers } from '@usedapp/core';
import firebase from 'firebase';
import RequireSetProject from '../../Components/RequireSetProject';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Releases', link: '/releases' },
  { label: 'Create', isActive: true },
];

const functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

const Releases = () => {
  const [submitting, setSubmitting] = useState(false);
  const { account, chainId } = useEthers();
  const { selectedProject, projects } = useContext(DappContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = function (data) {
    setSubmitting(true);

    // 1. upload
    const rand = Math.floor(Math.random() * 1000000000000);
    firebase.storage()
      .ref(`/releases/${account}/${projects[selectedProject].nftId}/${rand}-${data.version}/`)
      .put(data.webgl[0])
      .then((snapshot) => {
        console.log('One success:', data.webgl[0])
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => {
        console.log('One failed:', data.webgl[0], error.message)
      })

      // 2. do API request
      .then(url => {
        console.log(data);
        data.webgl = url;

        firebase.auth().currentUser.getIdToken()
          .then(async token => {
            return fetch(`${functionsURL}/createRelease`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
              body: JSON.stringify(data)
            })
          })
          .then(res => { window.location.href = "/releases"; });
      });
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.releasesPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={8}>
          <Card style={{ padding: "12px 12px" }}>
            <RequireSetProject>
              {submitting ?
                <div>Please wait while the release is being uploaded. Do not leave this page.</div>
                :
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" id="chainId" {...register("chainId")} value={chainId} />
                  <input type="hidden" id="nftId" {...register("nftId")}
                    value={projects[selectedProject]?.nftId}
                  />
                  <ValidatedInput errors={errors} register={register}
                    inputId="version" inputType="text"
                    label="*Release Version:"
                    validation={{
                      required: true,
                      validate: value => (/[0-9.]/.test(value) ? true : "Must be in the form 1.0.1")
                    }}
                  />
                  <ValidatedInput errors={errors} register={register}
                    inputId="webgl" inputType="file"
                    label="*Release WebGL File:"
                    validation={{ required: true }}
                  />
                  <Button className="mr-2 mb-2" variant="contained" type="submit">
                    Submit New Release
                  </Button>
                </form>
              }
            </RequireSetProject>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ padding: "12px 12px" }}>
            <p>Please upload a webgl package for your release.</p>
            <p>Please refer to chainlink's documentation for creating a Web3 project using Unity.</p>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Releases;
