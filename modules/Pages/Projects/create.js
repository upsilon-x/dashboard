import React, { useState, useEffect } from 'react';
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

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', link: '/projects' },
  { label: 'Create', isActive: true },
];

const Projects = () => {

  const { account, chainId } = useEthers();
  const wethInterface = new utils.Interface(contracts[chainIdToName(chainId)].projectNFT.abi);
  const wethContractAddress = contracts[chainIdToName(chainId)].projectNFT.address;
  const contract = new Contract(wethContractAddress, wethInterface);
  const { send, state } = useContractFunction(contract, 'mintProject', { transactionName: 'Wrap' });

  // Form
  const [projectName, setProjectName] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [mintStatus, setMintStatus] = useState("");

  // 1. Make blockchain request
  function mintProject(e) {
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
      let nftNum = state.receipt.events[0].args.tokenId.toNumber();
      console.log(nftNum);

      // 3. Send firebase API request
      setMintStatus("Writing to database.");
      let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

      // 4. Recieve firebase API request
      firebase.auth().currentUser.getIdToken()
      // TODO: add upload photo
      .then(token => {
        console.log("Starting post", projectName, nftNum, chainId);
        return fetch(`${functionsURL}/mintProject`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            image: "https://lumiere-a.akamaihd.net/v1/images/ct_belle_upcportalreskin_20694_e5816813.jpeg?region=0%2C0%2C330%2C330",
            name: projectName,
            nftId: nftNum,
            chainId: chainId
          })
        })
      })
      .then(response => {
        console.log(response);
        setWaiting(false);
      })
      // TODO: query then update projects in context
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
              <IntlMessages id="pages.projectsPage.createProject" />
              {waiting ?
                <div>Project is being created. Status: {mintStatus}</div>
                :
                <div className='mt-2'>
                  <div>
                    <InputLabel htmlfor="proj-name">Project Name</InputLabel>
                    <Input id="proj-name" onChange={e => { setProjectName(e.target.value) }}></Input>
                    <InputLabel htmlfor="proj-icon">Project Icon</InputLabel>
                    <Input id="proj-icon"></Input>
                  </div>
                  <Button color="primary" variant="contained" size="small" onClick={mintProject}>
                    Create Project lol
                  </Button>
                </div>
              }
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Projects;
