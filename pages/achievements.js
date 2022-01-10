import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const AchievementsPage = dynamic(() => import('../modules/Pages/Achievements'), {
  loading: () => <PageLoader />,
});

const DefaultPage = () => {
  return <SecurePage><AchievementsPage /></SecurePage>;
};

export default DefaultPage;
