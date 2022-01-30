import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { useAuth } from "../../../authentication";
import { useEthers } from '@usedapp/core'
import Link from 'next/link';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';


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



  //#region Widgets

  const AuthenticationWidget = () => (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h3">Authentication</Typography>
          <Typography variant="p">
            {authUser === false && isLoading == false ?
              "You may not have authenticated yet. Please connect with your wallet."
              : authUser === true ?
                "You are authenticated!"
                :
                "Authentication in progress..."
            }
          </Typography>
        </CardContent>
        <CardActions>
          {authUser === false && isLoading == false ?
            <>
              <Button onClick={resetAccountAuthentication}>Authenticate</Button>
              <Button onClick={() => { deactivate() }}>Disconnect</Button>
            </>
            : authUser === true ?
              <Button onClick={() => { userSignOut(false); }}>Log Out</Button>
              : <></>
          }
        </CardActions>
      </Card>
    </Grid>
  );

  const ProjectsWidget = () => (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h3">Projects</Typography>
          <Typography variant="p">
            You'll need to mint a project NFT to publish your game.
          </Typography>
        </CardContent>
        <CardActions>
          <Link href="projects">
            <Button>
              View Projects
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );

  const LearnMoreWidget = () => (
    <Grid item>
      <Card>
        <CardContent>
          <Typography variant="h3">Learn More</Typography>
          <SidebarButtons />
        </CardContent>
      </Card>
    </Grid>
  );

  //#endregion

  return (
    <PageContainer heading={<IntlMessages id="pages.startPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item sm={8} xs={12}>
          <GridContainer>
            <AuthenticationWidget />
            {authUser === true ?
              <>
                <ProjectsWidget />
              </>
              :
              <></>
            }
          </GridContainer>
        </Grid>
        <Grid item sm={4} xs={12}>
          <LearnMoreWidget />
        </Grid>
      </GridContainer>

    </PageContainer>
  );
};

export default StartPage;
