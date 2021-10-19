import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import Authentication from './Authentication';
import Home from './Home';
import { app, db } from "../firebase-config";
import { getAuth } from 'firebase/auth';
import { collection, getDocs, where, query } from "firebase/firestore";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const recipeRef = collection(db, "Recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getDocs(recipeRef);
      const q = query(recipeRef, where("Vegan", "==", 1));
      const allVegan = await getDocs(q);
    };

    getRecipes();
  }, [recipeRef]);

  getAuth().onAuthStateChanged(user => {
    if (user) {
      setIsUserSignedIn(true)
      setUsername(user.displayName);
    } else {
      setIsUserSignedIn(false)
    }
  })

  if (isUserSignedIn) {
    return (
      <Router>
        <div className="App">
        <Home username={username}/>
        <p>Body</p>
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
  // return (
  //   <div className="App">
  //       { isUserSignedIn ? (<Home username={username}/>) : (<Authentication setUsername={setUsername}/>) }
  //   </div>
  // );
}

export default App;