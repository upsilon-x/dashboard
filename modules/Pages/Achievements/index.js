import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Box from '@material-ui/core/Box';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Achievements', isActive: true },
];

const Achievements = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.achievementsPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <Box>
            <IntlMessages id="pages.achievementsPage.description" />
          </Box>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Knowledge Base and Support</h3>
            <SidebarButtons />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Achievements;
