import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const ReleasesPage = dynamic(() => import('../modules/Pages/Releases'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <SecurePage><ReleasesPage /></SecurePage>;
};

export default DefaultPage;
