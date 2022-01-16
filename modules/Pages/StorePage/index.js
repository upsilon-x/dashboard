import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import { Grid, Button, Card, InputLabel, TextField } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { useForm } from "react-hook-form";

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
        <Grid item xs={8}>
          <Card style={{ padding: "16px 16px" }}>
            {/* Make a simple form here. Shouldn't be too hard. Video, images, etc */}
            {/* Buttons: Go to Store Page / Add NFTs to Sell */}
            {/* TODO: make a general style for forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputLabel for="title">Display Title:</InputLabel>
              <Input id="title" className="mb-2"
                {...register("title", { required: true })}
              />
              <InputLabel for="blurb">Blurb:</InputLabel>
              <Input id="blurb" className="mb-2"
                {...register("blurb", { required: true })}
              />
              <InputLabel for="blurb">Youtube Trailer (optional):</InputLabel>
              <Input id="trailer" className="mb-2"
                {...register("trailer", { required: true })}
              />
              <div>Insert image carousel here</div>
              {/* TODO: Replace with markdown */}
              <InputLabel for="description">Description:</InputLabel>
              <TextField multiline id="description" className="mb-2" variant="outlined" style={{width: "100%"}}
                {...register("description", { required: true })}
              />
              <InputLabel for="blurb">Audit (optional):</InputLabel>
              <Input id="audit" className="mb-2"
                {...register("audit", { required: true })}
              />
              <div>
                <Button className="mr-2 mb-2" variant="contained">Submit Changes</Button>
              </div>
            </form>
          </Card>
        </Grid>
        <Grid item xs={4}>
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
