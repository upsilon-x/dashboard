import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const DefaultPage = dynamic(() => import('../modules/Pages/Projects'), {
  loading: () => <PageLoader />,
});

const HomePage = () => {
  return <DefaultPage />;
};

export default HomePage;
