import { useState, useEffect } from 'react';
import { useAuth } from '../../index';
import firebase from "firebase";
import ENV_VAR from "../../../ENV_VAR.json";
import { useEthers } from '@usedapp/core'

//  Adapted from this:
//  https://eliteionic.com/tutorials/creating-web3-login-with-ethereum-metamask-firebase-auth/

/**
 * Using this hook:
 * 
 * 1. Check to see if the user has connected with metamask yet. If they aren't, they'll need to be.
 * 2. The Hook:
 *      Ask for nonce from server
 *      Sign nonce
 *      Ask for nonce token from server, which checks if it has been signed
 *      Authenticate
 */
export default function useSignInWithMetamask() {
  /**
    const [authUser, setAuthUser] = useState(false);
    // put this out of the function I think
    firebase.auth().onAuthStateChanged(x => {
      setAuthUser(x != null);
    });
   */
  const { authUser, userSignOut } = useAuth();
  const { account } = useEthers();

  // TODO:  Add some checks to make sure that there isn't already a pending signature. 
  //        Asks too many times. Maybe a race condition is made?

  useEffect(x => {
    let user = firebase.auth().currentUser;
    let addressIsAuthenticated = user != null && account != null && user.uid.toLowerCase() == account.toLowerCase();
    let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;

    console.log("signInWithMetamask", account, authUser, user, addressIsAuthenticated);
    if (account == null && authUser) {
      userSignOut(); // firebase.auth().signOut()
    }
    else if (account != null && !addressIsAuthenticated) {
      // 1 Ask for nonce
      fetch(`${functionsURL}/getNonceToSign`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: account
        })
      })
        .then((response) => response.json())

        // 2 Sign nonce
        .then(async (response) => await window.ethereum.request({
          method: 'personal_sign',
          params: [
            `0x${toHex(response.nonce)}`,
            account
          ]
        }))
        .then((sig) => {
          // 3 Ask for token after signature
          fetch(`${functionsURL}/verifySignedMessage`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: account,
              signature: sig
            })
          })
            .then((response) => response.json())

            // 4 Authenticate
            .then((response) => firebase.auth().signInWithCustomToken(response.token))
            .then((response) => {
              console.log(response);
              if (response != null) {
                // yay it finished
              }
            })
        });
    }

  }, [account, authUser]);

  return authUser;
}

function toHex(stringToConvert) {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
