import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const StorePage = dynamic(() => import('../modules/Pages/StorePage'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <SecurePage><StorePage /></SecurePage>;
};

export default DefaultPage;
