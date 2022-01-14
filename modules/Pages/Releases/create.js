import React, { useRef } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { Button, Card, InputLabel, FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useForm } from "react-hook-form";

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Releases', link: '/releases' },
  { label: 'Create', isActive: true },
];

const Releases = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = function (data) {
    // 1. upload
    // 2. do API request
    console.log(data);
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.releasesPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={6}>
          <Card style={{ padding: "12px 12px" }}>
            {submitting ?
              <div>Please wait while the release is being uploaded. Do not leave this page.</div>
              :
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputLabel for="version">Release Version:</InputLabel>
                <Input
                  id="version"
                  className="mb-2"
                  {...register("version", { required: true })}
                />
                <InputLabel for="webgl">Release WebGL File:</InputLabel>
                <Input
                  type="file"
                  id="webgl"
                  {...register("webgl", { required: true })}
                />
                <Button>Submit New Release</Button>
              </form>
            }
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ padding: "12px 12px" }}>
            <p>Please upload a webgl package for your release.</p>
            <p>Please refer to chainlink's documentation for creating a Web3 project using Unity.</p>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Releases;
