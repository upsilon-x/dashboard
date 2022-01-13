import React, { useContext } from 'react';
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
import DappContext from '../../Context/DappContext';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Projects', isActive: true },
];

const Projects = () => {
  const { projects, setSelectedProject } = useContext(DappContext);

  return (
    <PageContainer heading={<IntlMessages id="pages.projectsPage" />} breadcrumbs={breadcrumbs}>
      {/*<IntlMessages id="pages.projectsPage.description" />*/}
      <GridContainer>
        {projects?.map((x, i) => (
          <Grid item lg={3} sm={4} xs={6}>
            <CmtCard>
              <CmtCardHeader title={x.name}></CmtCardHeader>
              <CmtCardContent>
                <CmtImage src={x.imageURL} alt={x.name} />
                <Button color="primary" size="small" variant="contained" onClick={function () { setSelectedProject(i); }}>
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
