import { useEffect } from 'react';
import './App.css';
import db from "./firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

function App() {
  const recipeRef = collection(db, "Recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipe = await getDocs(recipeRef);
      const q = query(recipeRef, where("Vegan", "==", 1));
      const allVegan = await getDocs(q);
      console.log(allVegan.docs[0].data().Name);
    };

    getRecipes();
  }, [recipeRef]);534

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Database works!
        </p>
      </header>
    </div>
  );
}

export default App;
