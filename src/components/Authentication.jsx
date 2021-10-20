import React, { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from '@firebase/firestore';
import db from "../firebase-config";
import store from "../store";
import { connect } from "react-redux";
 
const mapStateToProps = (state) => {
    return { userID: state.userID, userData: state.userData}
};

function Authentication(props) {
    const { setUsername, userID, userData } = props;

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
            console.log(error)
        });
    }

    console.log(userID);
    console.log(userData);

    useEffect(() => {
        const getUserData = async (usr) => {
            const docRef = doc(db, "Users", usr);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            store.dispatch({
                type: "assign",
                item: docSnap.data().Inventory
            })
            } else {
                const payload = {
                    Name: usr,
                    Inventory: []
                }
                await setDoc(docRef, payload);
            } 
        }
        if (userID) {
            getUserData(userID);
        }
    }, [userID]);

    

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