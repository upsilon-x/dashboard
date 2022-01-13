import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Link from 'next/link';

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Releases', link: '/releases' },
  { label: 'Create', isActive: true },
];

const Releases = () => {

  // TODO: firebase request
  const rows = [
    { "id": 9, "version": "1.0.3", "status": "Live" },
    { "id": 7, "version": "0.8.0", "status": "Archived" },
    { "id": 6, "version": "0.7.2", "status": "Draft" },
    { "id": 5, "version": "0.7.1", "status": "Archived" },
    { "id": 2, "version": "0.6.0", "status": "Archived" },
  ]

  return (
    <PageContainer heading={<IntlMessages id="pages.releasesPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} md={4}>
          <Card style={{ padding: "12px 12px" }}>
              I guess it's time to make a release or something
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Releases;
