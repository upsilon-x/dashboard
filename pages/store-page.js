import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const StorePage = dynamic(() => import('../modules/Pages/StorePage'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <StorePage />;
};

export default DefaultPage;
