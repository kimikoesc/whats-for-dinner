import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { connect } from "react-redux";

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
            console.log(error)
        });
    }

    return (
        <div>
            <header className="App-header">
                 <h1 id="welcome-page">What's for dinner?</h1>
                 <button onClick={SignIn} id="sign-in">Sign In with Google</button>
            </header>
        </div>
    )
}


export default Authentication