import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Authentication from './Authentication';
import Home from './Home';
import Recipes from './Recipes';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import db from "../firebase-config";

import store from "../store";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  getAuth().onAuthStateChanged(user => {
    if (user) {
      setIsUserSignedIn(true)
      store.dispatch({
        type: "assignUsername",
        item: user.displayName
      })
      getUserData(user.displayName)
    } else {
      setIsUserSignedIn(false)
    }
  })

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
  
  if (isUserSignedIn) {
    document.body.style.background = "white";
    return (
        <div className="home">
        <Home/>
        <Recipes/>
        </div>
    )
  } else {
    return (
        <div className="welcome">
        <Authentication/>
        </div>
    )
  }
}

export default App;