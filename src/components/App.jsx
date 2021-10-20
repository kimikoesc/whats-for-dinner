import { useState, useEffect } from 'react';
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
      store.dispatch({
        type: "assignUser",
        item: user.displayName
      })
    } else {
      setIsUserSignedIn(false)
    }
  })
  
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