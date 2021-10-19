import { getDocs, query, where, onSnapshot, collection } from '@firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from "../firebase-config";


function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "Recipes"), (snapshot) => {
            setRecipes(snapshot.docs.map(doc => doc.data()));
        });

    }, []);
    console.log(recipes);
    return (
        <div>
        {recipes.map(recipe => (
            <p key= {recipe.Name} > { recipe.Name }</p>
        ))}
        </div>
    )
}

export default Recipes
