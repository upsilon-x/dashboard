import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';

const AchievementsPage = dynamic(() => import('../modules/Pages/Achievements'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <AchievementsPage />;
};

export default DefaultPage;
