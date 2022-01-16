import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Button } from '@material-ui/core';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useAuth } from "../../../authentication";
import { useEthers } from '@usedapp/core'

const breadcrumbs = [
  { label: 'Home', isActive: true }
];

const StartPage = () => {

  let { authUser, isLoading, userSignOut } = useAuth();
  let { activateBrowserWallet, deactivate } = useEthers();

  const resetAccountAuthentication = async () => {
    await deactivate();
    activateBrowserWallet();
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.startPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <Box>
            <IntlMessages id="pages.startPage.description" />
          </Box>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Box>
            {authUser === false && isLoading == false ?
              <>
                <div>You may not have authenticated yet. Please connect.</div>
                <Button onClick={resetAccountAuthentication}>Metamask Authenticate</Button>
                <Button onClick={() => {deactivate()}}>Wallet Disconnect</Button>
              </>
              : authUser === true ?
                <>
                  <div>You are authenticated!</div>
                  <Button onClick={() => { userSignOut(false); }}>Log Out</Button>
                </>
                :
                <>
                  <div>Loading...</div>
                </>
            }
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <div>Learn more about our developer resources through our documentation:</div>
            <Button>Test Button</Button>
            <Button>Test Button</Button>
            <Button>Test Button</Button>
          </Box>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default StartPage;
