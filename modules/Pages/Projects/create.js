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
import contracts from '../../Context/Contracts';
import { useEthers } from '@usedapp/core'

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', link: '/projects' },
  { label: 'Create', isActive: true },
];

const wethInterface = new utils.Interface(contracts.ropsten.projectNFT.abi);
const wethContractAddress = contracts.ropsten.projectNFT.address;
const contract = new Contract(wethContractAddress, wethInterface);

const Projects = () => {

  const [waiting, setWaiting] = useState(false);
  const { send, state } = useContractFunction(contract, 'mintProject', { transactionName: 'Wrap' });
  const { account } = useEthers();

  // 1. Make blockchain request
  async function mintProject(e) {
    // waiting visual ...
    setWaiting(true);
    // This will activate the useEffect below
    send(account);
  }

  // 2. Receive blockchain result
  useEffect(() => {
    console.log(state);
    if (state.status == "Success") {
      let num = state.receipt.events[0].args.tokenId;
      alert("TokenId: " + num);
      setWaiting(false);
    }
    else if (state.status == "Failed" || state.status == "Exception") {
      alert("Oh no! There was an error!");
      setWaiting(false);
    }
  }, [state]);

  // 3. Send firebase API request


  // 4. Recieve firebase API request


  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage.createProject" />} breadcrumbs={breadcrumbs}>
      <TransactionSnackbar state={state} />
      <GridContainer>
        <Grid item xs={12}>
          <IntlMessages id="pages.projectsPage.create.description" />
        </Grid>
        <Grid item xs={12}>
          <CmtCard>
            <CmtCardContent>
              <IntlMessages id="pages.projectsPage.createProject" />
              {waiting ?
                <div>we're waiting yo</div>
                :
                <div className='mt-2'>
                  <div>
                    <InputLabel htmlfor="proj-name">Project Name</InputLabel>
                    <Input id="proj-name"></Input>
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
