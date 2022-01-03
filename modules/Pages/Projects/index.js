import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Box from '@material-ui/core';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
//import Typography from '@material-ui/core';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', isActive: true },
];

// Get all of the projects from an API endpoint & replace the data
const availableProjects = [
  {
    icon: 'https://img.utdstc.com/icon/e0f/9d4/e0f9d4bd1d4dc98d78d74486d72a283b9123fa28707c0461cb16fcd08edeced6:200',
    name: 'DicTater | 4X Potato Strategy',
  },
  {
    icon: 'https://img.utdstc.com/icon/e71/185/e711857f098036a3e43e9365e397c4c21ac5ec85285758ddccfa1e391a865efc:200',
    name: 'Clash Royale'
  }
];


const Projects = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <Box>
            <IntlMessages id="pages.projectsPage.description" />
          </Box>
          <Divider />
          {availableProjects.map(proj => {
            <CmtCard>
              <CmtCardHeader title={proj.name} />
              <CmtCardContent>
                <Image src={proj.icon}></Image>
              </CmtCardContent>
            </CmtCard>
          })
          }
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Projects;
