import React, { useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import { Button, Card, InputLabel, FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useForm } from "react-hook-form";
import ValidatedInput from "../../Components/Form/ValidatedInput";

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Releases', link: '/releases' },
  { label: 'Create', isActive: true },
];

const Releases = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = function (data) {
    setSubmitting(true);
    // 1. upload
    console.log(data);
    // 2. do API request
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.releasesPage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={8}>
          <Card style={{ padding: "12px 12px" }}>
            {submitting ?
              <div>Please wait while the release is being uploaded. Do not leave this page.</div>
              :
              <form onSubmit={handleSubmit(onSubmit)}>
                <ValidatedInput errors={errors} register={register}
                  inputId="version" inputType="text"
                  label="*Release Version:"
                  validation={{ required: true, 
                    validate: value => ( /[0-9.]/.test(value) ? true : "Must be in the form 1.0.1" )}}
                />
                <ValidatedInput errors={errors} register={register}
                  inputId="releasefile" inputType="file"
                  label="*Release WebGL File:"
                  validation={{ required: true }}
                />
                <Button className="mr-2 mb-2" variant="contained" type="submit">
                  Submit New Release
                </Button>
              </form>
            }
          </Card>
        </Grid>
        <Grid item xs={4}>
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
