import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import { Grid, Button, Card, InputLabel, TextField, Typography } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useForm } from "react-hook-form";
import ValidatedInput from "../../Components/Form/ValidatedInput";

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Store Page', isActive: true },
];
/**
 * https://www.npmjs.com/package/react-images-uploading
 * https://bestofreactjs.com/repo/TPMinan-react-upload-gallery-react-image
 * 
 */
 
const StorePage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = function (data) {
    // 1. upload
    // 2. do API request
    console.log(data);
  }

  return (
    <PageContainer heading={<IntlMessages id="pages.storePage" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={8}>
          <Card style={{ padding: "16px 16px" }}>
            {/* Make a simple form here. Shouldn't be too hard. Video, images, etc */}
            {/* Buttons: Go to Store Page / Add NFTs to Sell */}
            {/* TODO: make a general style for forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <ValidatedInput errors={errors} register={register}
                inputId="title" inputType="text" 
                label="*Display Title:"
                validation={{required: true, maxLength: 50, minLength: 3}}
              />
              <ValidatedInput errors={errors} register={register}
                inputId="blurb" inputType="text" multiline
                label="*Blurb:"
                validation={{required: true, maxLength: 150, minLength: 10}}
              />
              <ValidatedInput errors={errors} register={register}
                inputId="trailer" inputType="url" 
                label="Youtube Trailer:"
              />
              <ValidatedInput errors={errors} register={register}
                inputId="audit" inputType="url" 
                label="Audit:"
              />
              <div class="mb-4 mt-4 ml-4 mr-4">Insert image carousel here</div>
              {/* TODO: Replace with markdown */}
              <ValidatedInput errors={errors} register={register}
                inputId="description" multiline textfield
                label="*Description:"
                validation={{ required: true, maxLength: 10000, minLength: 100 }}
              />
              <div>
                <Button className="mr-2 mb-2" variant="contained" type="submit">
                  Submit Changes
                </Button>
              </div>
            </form>
          </Card>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Card style={{ padding: "16px 16px" }}>
            <IntlMessages id="pages.storePage.description" />
            <Button className="mr-2 mt-2 mb-2" variant="contained">Publish Store Page</Button>
            <Button className="mr-2 mb-2" variant="contained">Go to Store Page</Button>
            <Button className="mr-2 mb-2" variant="contained">Import NFTs</Button>
          </Card>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default StorePage;
