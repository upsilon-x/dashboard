import React, { useState, useEffect, useContext, useRef } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import { Button, Input, InputLabel } from '@material-ui/core';
import TransactionSnackbar from '../../Components/TransactionSnackbar';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import contracts, { chainIdToName } from '../../Context/Contracts';
import { useEthers } from '@usedapp/core'
import ENV_VAR from "../../../ENV_VAR.json";
import firebase from 'firebase';
import DappContext from "../../Context/DappContext";
import ValidatedInput from "../../Components/Form/ValidatedInput";
import { useForm } from "react-hook-form";

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', link: '/projects' },
  { label: 'Create', isActive: true },
];

const PROJECT_NAME_ID = "proj-name";

const Projects = () => {

  const { account, chainId } = useEthers();
  const contractInterface = new utils.Interface(contracts.ProjectNFT.abi);
  const contractAddress = contracts.ProjectNFT[chainIdToName(chainId)] ?? "0x0000000000000000000000000000000000000000";;
  const contract = new Contract(contractAddress, contractInterface);
  const { send, state } = useContractFunction(contract, 'mintProject', { transactionName: 'Wrap' });

  const { projects, setProjects } = useContext(DappContext);

  // Form
  const [formData, setFormData] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [mintStatus, setMintStatus] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 1. Make blockchain request
  function mintProject(data) {
    console.log(data);

    // Form data is set
    setFormData(data);

    // waiting visual ...
    setWaiting(true);
    // This will activate the useEffect below
    send(account);
    setMintStatus("Minting NFT via smart contract.")
  }

  // 2. Receive blockchain result
  useEffect(() => {
    console.log(state);
    if (state.status == "Success") {
      console.log(state);
      let nftNum = state.receipt.events[0].args.tokenId.toNumber();
      console.log(nftNum);

      // 3. Send firebase API request
      setMintStatus("Uploading & writing to database.");
      let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

      // 4. Recieve firebase API request
      firebase.auth().currentUser.getIdToken()
        .then(async token => {
          // Upload photo
          const rand = Math.floor(Math.random() * 1000000000000);
          const uploadTask = firebase.storage()
            .ref(`/images/${account}/${rand}-${formData[PROJECT_NAME_ID]}/`)
            .put(formData["proj-icon"][0]);
          const imageURL = await new Promise(function (resolve, reject) {
            uploadTask.on('state_changed', function (snapshot) { }, function error(err) { reject() }, function complete() {
              uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL));
            });
          });

          const projectName = formData[PROJECT_NAME_ID];
          const newProject = {
            nftId: nftNum,
            chainId: chainId,
            name: projectName,
            imageURL: imageURL,
          };

          console.log("Starting post", projectName, nftNum, chainId);
          fetch(`${functionsURL}/mintProject`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
            body: JSON.stringify({
              image: imageURL,
              name: projectName,
              nftId: nftNum,
              chainId: chainId
            })
          })
          .then(response => {  
            // Add to projects
            if (projects == null) setProjects([newProject]);
            else setProjects([...projects, newProject]);

            setMintStatus("Project creation successful. Redirecting.");

            // Link back to projects
            window.location.href = "/projects";
          })
        });
    }
    else if (state.status == "Failed" || state.status == "Exception") {
      alert("Oh no! There was an error!");
      setWaiting(false);
    }
  }, [state]);



  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage.createProject" />} breadcrumbs={breadcrumbs}>
      {/*<TransactionSnackbar state={state} />*/}
      <GridContainer>
        <Grid item xs={12}>
          <IntlMessages id="pages.projectsPage.create.description" />
        </Grid>
        <Grid item xs={12}>
          <CmtCard>
            <CmtCardContent>
              {waiting ?
                <div>Project is being created. Status: {mintStatus}</div>
                :
                <form className='mt-2' onSubmit={handleSubmit(mintProject)}>
                  <div className='mb-2'>
                    <ValidatedInput errors={errors} register={register}
                      inputId={PROJECT_NAME_ID} inputType="text"
                      label="*Project Name:"
                      validation={{ required: true, maxLength: 50, minLength: 3 }}
                    />
                    <ValidatedInput errors={errors} register={register}
                      inputId="proj-icon" inputType="file"
                      label="*Project Icon:"
                      validation={{ required: true }}
                    />
                    {/*<Input type="file" id="proj-icon" onChange={handleImageAsFile}></Input>*/}
                  </div>
                  <Button color="primary" variant="contained" size="small" type="submit">
                    Create Project
                  </Button>
                </form>
              }
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Projects;
