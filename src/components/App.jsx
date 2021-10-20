import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/App.css';
import Authentication from './Authentication';
import Home from './Home';
import Recipes from './Recipes';
import { getAuth } from 'firebase/auth';
import store from "../store"

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  getAuth().onAuthStateChanged(user => {
    if (user) {
      setIsUserSignedIn(true)
      setUsername(user.displayName)
      store.dispatch({
        type: "assignUser",
        item: user.displayName
      })
    } else {
      setIsUserSignedIn(false)
    }
  })



  console.log(store.getState().userData);
  console.log(store.getState().filterOption);
  console.log(store.getState().allRecipes)
  
  if (isUserSignedIn) {
    document.body.style.background = "white";
    return (
        <div className="home">
        <Home username={username}/>
        <Recipes/>
        </div>
    )
  } else {
    return (
        <div className="welcome">
        <Authentication setUsername={setUsername}/>
        </div>
    )
  }
}

export default App;