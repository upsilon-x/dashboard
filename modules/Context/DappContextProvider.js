import React, { useEffect, useState } from 'react';
import useSignInWithMetamask from '../../authentication/auth-methods/firebase-auth/useSignInWithMetamask';
import DappContext from './DappContext';
import { useAuth } from '../../authentication';
import { useEthers, useContractFunction } from '@usedapp/core';
import firebase from 'firebase';
import ENV_VAR from "../../ENV_VAR.json";

const DappContextProvider = ({ children }) => {
  const [projects, setProjects] = useState();
  const [selectedProject, setSelectedProject] = useState(0);
  useSignInWithMetamask();

  // Project Status Check
  const { account, chainId } = useEthers();
  // 1. Query blockchain (get the 10 most recent projects)
  useEffect(x => {
    if (account != null && chainId != null) {
      let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;
      fetch(`${functionsURL}/getProjects`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chainId: chainId,
          address: account
        })
      })
      .then((response) => response.json())
      .then(response => {
        setProjects(response);
        if(response.length > 0) setSelectedProject(0);
      })
    }
  }, [account, chainId]);



  const contextValue = React.useMemo(() => {
    return {
      projects,
      setProjects,
      selectedProject,
      setSelectedProject
    };
  }, [projects]);

  return <DappContext.Provider value={contextValue}>{children}</DappContext.Provider>;
};


export default DappContextProvider;
