import { useEffect } from 'react';
import './App.css';
import db from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const recipeRef = collection(db, "Recipes");

  useEffect(() => {
    const getRecipes = async () => {
      const data = await getDocs(recipeRef);
      console.log(data.docs.map((doc) => ({Name: doc.data().Name})));
    };

    getRecipes();
  }, [recipeRef]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello!
        </p>
      </header>
    </div>
  );
}

export default App;
