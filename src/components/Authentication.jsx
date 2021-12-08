import React, { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from '@firebase/firestore';
import db from "../firebase-config";
import store from "../store";
import { connect } from "react-redux";
 
const mapStateToProps = (state) => {
    return { username: state.username, userData: state.userData}
};

function Authentication(props) {
    const { username } = props;

    const SignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // store.dispatch({
            //     type: "assignUsername",
            //     item: user.displayName
            // })
        }).catch((error) => {
            console.log(error)
        });
    }

    // useEffect(() => {
    //     const getUserData = async (usr) => {
    //         const docRef = doc(db, "Users", usr);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //         store.dispatch({
    //             type: "assign",
    //             item: docSnap.data().Inventory
    //         })
    //         } else {
    //             const payload = {
    //                 Name: usr,
    //                 Inventory: []
    //             }
    //             await setDoc(docRef, payload);
    //         } 
    //     }
    //     if (username) {
    //         getUserData(username);
    //     }
    // }, [username]);

    return (
        <div>
            <header className="App-header">
                 <h1 id="welcome-page">What's for dinner?</h1>
                 <button onClick={SignIn} id="sign-in">Sign In with Google</button>
            </header>
        </div>
    )
}


export default connect(mapStateToProps)(Authentication)