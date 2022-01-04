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
import { Button } from '@material-ui/core';
import Link from 'next/link';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', isActive: true },
];

// Replace with an api request
const projects = [
  {
    name: "Project 1",
    image: "https://play-lh.googleusercontent.com/10axL9ZMum2LZmCsVutZwvwfx0bkYhB-G7c12Qvl1xDexMYxcqwILCYNgnzzcSDbLrAw=s180-rw",
    id: 1
  },
  {
    name: "Project 2",
    image: "https://play-lh.googleusercontent.com/-meRETSTUS8DBtnim75eGwlTPncfiUpR5zAiSl3hu5NnuETVmYA4Fk-vIUBVWdd-ynw=s180-rw",
    id: 2
  }
]

const Projects = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage" />} breadcrumbs={breadcrumbs}>
      {/*<IntlMessages id="pages.projectsPage.description" />*/}
      <GridContainer>
        {projects.map((x, i) => (
          <Grid item lg={3} sm={4} xs={6}>
            <CmtCard>
              <CmtCardHeader title={x.name}></CmtCardHeader>
              <CmtCardContent>
                <CmtImage src={x.image} alt={x.name} />
                <Button color="primary" size="small" variant="contained" onClick={function () { alert('select!') }}>
                  <IntlMessages id="sidebar.components.muiComponents.inputs.select" />
                </Button>
              </CmtCardContent>
            </CmtCard>
          </Grid>
        ))}
        <Grid item lg={3} sm={4} xs={6}>
          <CmtCard>
            <CmtCardContent>
              <IntlMessages id="pages.projectsPage.createProject" />
              <div className='mt-2'>
                <Link href="projects/create">
                <Button color="primary" variant="contained" size="small" >
                  <PostAdd />
                </Button>
                </Link>
              </div>
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Projects;
