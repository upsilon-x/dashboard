import React from 'react';
import { Select, InputLabel, Typography, MenuItem } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import { Fonts } from '../../../@jumbo/constants/ThemeOptions';

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
const ValidatedSelect = props => {

  const {
    errors, register, inputId, options, label, validation, customError,
    defaultValue = null
  } = props;

  function errorText(err) {
    if (errors[inputId].message != '') {
      return errors[inputId].message;
    }

    const capitalizedInput = inputId.charAt(0).toUpperCase() + inputId.slice(1);
    switch (err.type) {
      case 'required': return `${capitalizedInput} is required.`;
      case 'maxLength': return `Should be at most ${validation.maxLength} characters!`;
      case 'minLength': return `Should be at least ${validation.minLength} characters!`;
      case 'max': return 'This value is too large!';
      case 'min': return 'This value is too small!';
    }

    console.log(err);

    return customError ? customError(err) : "Submission error!";
  }

  const boxStyle = {
    marginRight: "12px", height: "32px", display: "flex", alignItems: "center",
    width: "45%", textAlign: "left"
  };

  console.log("DEFAULT VALUE:", defaultValue);

  return (
    <MuiThemeProvider theme={theme}>
      <>
        {errors[inputId]?.type != null ?
          <Typography variant="body2">{errorText(errors[inputId])}</Typography>
          : <></>
        }
        <div style={{ display: "flex" }}>
          <div style={boxStyle} >
            {label ? <InputLabel htmlFor={inputId + "-label"}>{label}</InputLabel> : <></>}
          </div>
          <Select id={inputId} labelId={inputId + "-label"}
            className="mb-2"
            style={{ width: "100%" }}
            {...register(inputId, validation)}
            defaultValue={defaultValue}
          >
            {options.map((x, i) => (
              <MenuItem value={x.value} key={i}>
                {x.name}
              </MenuItem>
            ))
            }
          </Select>
        </div>
      </>
    </MuiThemeProvider>
  );
};

export default ValidatedSelect;