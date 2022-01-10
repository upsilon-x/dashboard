import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const ProjectsPage = dynamic(() => import('../../modules/Pages/Projects/create'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <SecurePage><ProjectsPage /></SecurePage>;
};

export default DefaultPage;
