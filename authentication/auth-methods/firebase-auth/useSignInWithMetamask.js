import { useState, useEffect } from 'react';
import firebase from "firebase";
import ENV_VAR from "../../../ENV_VAR.json";

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
export default function useSignInWithMetamask(address) {
  const [authState, setAuthState] = useState(false);

  useEffect(x => {
    let user = firebase.auth().currentUser;
    let addressIsAuthenticated = user != null && user.uid.toLowerCase() == address.toLowerCase();

    let functionsURL = ENV_VAR[process.env.NODE_ENV].functions;
    

    if (address == null && addressIsAuthenticated) {
      firebase.auth().signOut();
    }
    else if (address != null && !addressIsAuthenticated) {
      setAuthState(false);
      // 1 Ask for nonce
      fetch(`${functionsURL}/getNonceToSign`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address
        })
      })
        .then((response) => response.json())

        // 2 Sign nonce
        .then(async (response) => await window.ethereum.request({
          method: 'personal_sign',
          params: [
            `0x${toHex(response.nonce)}`,
            address
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
              address: address,
              signature: sig
            })
          })
            .then((response) => response.json())

            // 4 Authenticate
            .then((response) => firebase.auth().signInWithCustomToken(response.token))
            .then((response) => {
              console.log(response);
              if (response != null) {
                setAuthState(true);
              }
            })
        });
    }

  }, [address]);


  return authState;
}

function toHex(stringToConvert) {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
