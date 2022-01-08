import { useState, useEffect } from 'react';
import firebase from "firebase";
import detectEthereumProvider from '@metamask/detect-provider';

//  Adapted from this:
//  https://eliteionic.com/tutorials/creating-web3-login-with-ethereum-metamask-firebase-auth/

/**
 * Using this function:
 * 
 * 1. Check to see if the user is already signed in. If they aren't, they'll need to be.
 * 2. Also check to see if the user has connected with metamask yet. If they aren't, they'll need to be.
 * 3. Call & await for function
 * 4. The Function:
 *      Ask for nonce from server
 *      Sign nonce
 *      Ask for nonce token from server, which checks if it has been signed
 *      Authenticate
 */

export default function useSignInWithMetamask(address) {
  const [authState, setAuthState] = useState(null);

  useEffect(x => {
    // TODO: sign out of firebase if already authenticated
    alert("Sign in with metamask activated:" + address);

    // 1 Ask for nonce
    if(address != null) fetch("https://us-central1-ethgameservices-dev.cloudfunctions.net/getNonceToSign", {
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
    .then(async (response) => await window.ethereum.request({
      method: 'personal_sign',
      params: [
        `0x${toHex(response.nonce)}`,
        address
      ]
    }))
    .then((sig) => {
      alert("Signature: " + sig);
      fetch("https://us-central1-ethgameservices-dev.cloudfunctions.net/verifySignedMessage", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address,
          signature: sig
        })
      })/*
      .then(async (response) => {
        // then sign in with custom token
        //await signInWithCustomToken(this.auth, response.token);
      })*/
    });

    // 2 Sign nonce

    // 3 Ask for nonce token

    // 4 Authenticate

    // 5 Authenticated or not?

  }, [address]);


  return authState;
}

function toHex(stringToConvert) {
  return stringToConvert
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
