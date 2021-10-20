import { useState } from 'react';
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
  
  if (isUserSignedIn) {
    document.body.style.background = "white";
    return (
      <Router>
        <div className="home">
        <Home username={username}/>
        <Recipes/>
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div className="welcome">
        <Authentication setUsername={setUsername}/>
        </div>
      </Router>
    )
  }
}

export default App;