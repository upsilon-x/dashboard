import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const ReleasesPage = dynamic(() => import('../modules/Pages/Releases'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <ReleasesPage />;
};

export default DefaultPage;
