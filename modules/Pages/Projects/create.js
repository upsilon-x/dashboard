import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { PostAdd } from '@material-ui/icons';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtImage from '../../../@coremat/CmtImage';
import { Button, Input, InputLabel } from '@material-ui/core';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', link: '/projects' },
  { label: 'Create', isActive: true },
];

const Projects = () => {
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
              <div className='mt-2'>
                <div>
                  <InputLabel htmlfor="proj-name">Project Name</InputLabel>
                  <Input id="proj-name"></Input>
                  <InputLabel htmlfor="proj-icon">Project Icon</InputLabel>
                  <Input id="proj-icon"></Input>
                </div>
                <Button color="primary" variant="contained" size="small" onClick={function () { alert('dab') }}>
                  Create Project lol
                </Button>
              </div>
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Projects;
