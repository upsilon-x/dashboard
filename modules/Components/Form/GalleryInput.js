import React from 'react';
import { Input, InputLabel, Typography, TextField } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import { Fonts } from '../../../@jumbo/constants/ThemeOptions';
import RUG from 'react-upload-gallery';
import 'react-upload-gallery/dist/style.css';

const theme = createTheme({
  typography: {
    fontFamily: Fonts.PRIMARY,
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 'bold',
    fontWeightExtraBold: 800,
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      h2: {
        fontSize: 18,
        fontWeight: 'bold'
      },
      h3: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      h4: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      h5: {
        fontSize: 14,
        fontWeight: 400,
      },
      h6: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.5,
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: 0.15,
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0.1,
      },
      body1: {
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: 0.5,
      },
      body2: {
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.25,
        color: 'red'
      },
    },
  }
});

/**
 * inputId = string
 * type = string
 * errors = object (react-hook-form)
 * register = function (react-hook-form)
 */
const ValidatedInput = props => {

  const { register } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <RUG {...props}>

      </RUG>
    </MuiThemeProvider>
  );
};

export default ValidatedInput;