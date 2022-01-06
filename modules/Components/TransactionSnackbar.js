import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@material-ui/core';

const TransactionSnackbar = ({ state }) => {

  const [internalOpen, setInternalOpen] = useState(
    state != null && (state.status == "Success" || state.status == "Failed" || state.status == "Exception")
  );
  function handleClose() {
    setInternalOpen(false);
  }

  let severity = "";
  switch (state.status) {
    case "Success":
      severity = "success";
      break;
    case "Failure":
      severity = "error";
      break;
    case "Exception":
      severity = "error";
      break;
  }

  return (
    <Snackbar
      open={internalOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {state.status}
      </Alert>
    </Snackbar>
  );
}

export default TransactionSnackbar;
