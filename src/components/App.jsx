import { useEffect, useState } from 'react';
import '../styles/App.css';
import Authentication from './Authentication';
import Home from './Home';
import { app, db } from "../firebase-config";
import { getAuth } from 'firebase/auth';
import { collection, getDocs, where, query } from "firebase/firestore";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const recipeRef = collection(db, "Recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getDocs(recipeRef);
      const q = query(recipeRef, where("Vegan", "==", 1));
      const allVegan = await getDocs(q);
      console.log(allVegan.docs[0].data().Name);
    };

    getRecipes();
  }, [recipeRef]);

  getAuth().onAuthStateChanged(user => {
  return user ? setIsUserSignedIn(true) : setIsUserSignedIn(false)
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          What's for dinner?
        </h1>
        { isUserSignedIn ? (<Home/>) : (<Authentication/>) }
      </header>
    </div>
  );
}

export default App;
