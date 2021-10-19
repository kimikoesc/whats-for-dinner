import { getDocs, query, where, onSnapshot, collection } from '@firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from "../firebase-config";
import "../styles/Recipes.css"


function Recipes() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "Recipes"), (snapshot) => {
            setRecipes(snapshot.docs.map(doc => doc.data()));
        });

    }, []);

    console.log(recipes);

    return (
        <div className="recipe">
            <h1> List of Recipes you can make </h1>
            {recipes.map(recipe => (
                <div className="recipe-container">
                    <img key={recipe.Name} src={recipe.Image} alt={recipe.Name}></img>
                    <h2 key= {recipe.Name} > { recipe.Name }</h2>
                    <div class="flexbox">
                        <div class="item">
                            <div class="content">
                                <p> Cook Time: </p>
                                <p> {recipe["Cook Time"]} minutes </p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <p>Level:</p>
                                <p>{recipe.Level} </p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="content">
                                <p>Ingredients: </p>
                                <p>{recipe.Ingredients.join(", ")}</p>
                            </div>
                        </div>
                        <div class="item">
                            <a href={recipe.Link} target="_blank">
                                <div class="content">
                                    <p>Click here to get the recipe </p>
                                </div>
                            </a>
                        </div>
                    </div>                    
                </div>
            ))}
        </div>
    )
}

export default Recipes
