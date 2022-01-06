import firebase from "firebase";

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

export default async function signInWithMetamask() {
    
}
