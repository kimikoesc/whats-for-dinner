import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import Authentication from './Authentication';
import Home from './Home';
import Recipes from './Recipes';
import { getAuth } from 'firebase/auth';

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  getAuth().onAuthStateChanged(user => {
    if (user) {
      setIsUserSignedIn(true)
      setUsername(user.displayName);
      console.log(user)
    } else {
      setIsUserSignedIn(false)
    }
  })

  if (isUserSignedIn) {
    return (
      <Router>
        <div className="App">
        <Home username={username}/>
        <Recipes/>
        </div>
      </Router>
    )
  } else {
    return (
      <Router>
        <div className="App">
        <Authentication setUsername={setUsername}/>
        </div>
      </Router>
    )
  }
}

export default App;