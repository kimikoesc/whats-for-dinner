import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Authentication(props) {
    const { setUsername } = props;

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setUsername(user.displayName);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return (
        <div>
            <header className="App-header">
                 <h1>What's for dinner?</h1>
                 <button onClick={SignIn}>Sign In with Google</button>
            </header>
        </div>
    )
}


export default Authentication