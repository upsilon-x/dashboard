import React, { useState, useContext } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import { Button, Input, InputLabel } from '@material-ui/core';
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
  const { send } = useContractFunction(contract, 'mintProject', { transactionName: 'Wrap' });
  const { account } = useEthers()

  async function mintProject(e) {
    // waiting visual ...
    setWaiting(true);

    // 1. make blockchain request
    alert(account);
    let blockchainRes = await send(account);
    alert(blockchainRes);

    // 2. make api database request (checks to make sure metamask authentication)


    // waiting visual off
    setWaiting(false);
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage.createProject" />} breadcrumbs={breadcrumbs}>
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
