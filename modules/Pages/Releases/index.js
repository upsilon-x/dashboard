import React, { useContext, useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Link from 'next/link';
import DappContext from "../../Context/DappContext";
import { useEthers } from '@usedapp/core'
import ENV_VAR from "../../../ENV_VAR.json";

const functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Releases', isActive: true },
];

const Releases = () => {

  const { projects, selectedProject } = useContext(DappContext);

  const { chainId } = useEthers();

  const [releases, setReleases] = useState(null);
  if (releases == null && projects != null) {
    setReleases(false);
    fetch(`${functionsURL}/getReleases`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nftId: projects[selectedProject].nftId,
        chainId: chainId
      })
    })
    .then((response) => response.json())
    .then(res => {
      console.log(res);
      setReleases(res);
    })
  }



  return (
    <PageContainer heading={<IntlMessages id="pages.releasesPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} md={8}>
          {/* NOTE: Potentially use MUI data grid? */
            releases === null || releases === false ?
              <div>Hold on. Getting releases...</div>
              :
              <TableContainer>
                <Table aria-label="release-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Release Id</TableCell>
                      <TableCell>Version</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {releases.map((row) => (
                      <TableRow key={row.releaseId}>
                        <TableCell component="th" scope="row">
                          {row.releaseId}
                        </TableCell>
                        <TableCell>v{row.version}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ padding: "12px 12px" }}>
            <IntlMessages id="pages.releasesPage.description" />
            <Link href="releases/create">
              <Button color="primary" variant="contained" size="small" className='mt-2' >
                Create New Release
              </Button>
            </Link>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Releases;
