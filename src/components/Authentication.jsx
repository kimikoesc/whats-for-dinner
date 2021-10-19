import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Authentication() {

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return (
        <div>
            <button onClick={SignIn}>Sign In with Google</button>
        </div>
    )
}


export default Authentication