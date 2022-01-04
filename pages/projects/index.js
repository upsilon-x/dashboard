import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const ProjectsPage = dynamic(() => import('../../modules/Pages/Projects/index'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <ProjectsPage />;
};

export default DefaultPage;
