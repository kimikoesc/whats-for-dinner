import { onSnapshot, collection } from '@firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from "../firebase-config";
import "../styles/Recipes.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {inventory: state.userData, filters: state.filterOption, flexible: state.flexible}
  };

function Recipes(props) {
    const [allRecipe, setAllRecipe] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const { inventory, filters, flexible } = props;

    useEffect(() => {
        onSnapshot(collection(db, "Recipes"), (snapshot) => {
            setAllRecipe(snapshot.docs.map(doc => doc.data()));
        });
        
    }, []);

    useEffect(() => {
    const getPossibleRecipe = () => {
        let result = [];
        for (let i = 0; i < allRecipe.length; i++) {
            if (!flexible) {
                if (filters === "vegan") {
                    if (allRecipe[i].Ingredients.every(item => inventory.includes(item.toLowerCase())) && allRecipe[i].Vegan === 1) {
                        result.push(allRecipe[i])
                    } 
                } else if (filters === "pescatarian") {
                    if (allRecipe[i].Ingredients.every(item => inventory.includes(item.toLowerCase())) && allRecipe[i].Pescatarian === 1) {
                        result.push(allRecipe[i])
                    } 
                } else {
                    if (allRecipe[i].Ingredients.every(item => inventory.includes(item.toLowerCase()))) {
                        result.push(allRecipe[i])
                    } 
                }
            } else {
                let ingredientsList = [];
                allRecipe[i].Ingredients.forEach(item => {
                    if (!inventory.includes(item.toLowerCase())) {
                        ingredientsList.push(item)
                    }
                })

                if (ingredientsList.length < 3) {
                    if (filters === "vegan") {
                        if (allRecipe[i].Vegan === 1) {
                            result.push(allRecipe[i])
                        } 
                    } else if (filters === "pescatarian") {
                        if (allRecipe[i].Pescatarian === 1) {
                            result.push(allRecipe[i])
                        } 
                    } else {     
                        result.push(allRecipe[i])
                    } 
                }
            }
        }
        setRecipes(result);
    };
    getPossibleRecipe();
    }, [inventory, allRecipe, filters]);

    return (
        <div className="recipe">
            <h1> List of Recipes you can make </h1>
            { recipes.length > 0 ? 
                <div>
                {recipes.map(recipe => (
                <div key={recipes.indexOf(recipe)} className="recipe-container">
                    <img src={recipe.Image} alt={recipe.Name}></img>
                    <h2> { recipe.Name }</h2>
                    <div className="flexbox">
                        <div className="item">
                            <div className="content">
                                <p> Cook Time: </p>
                                <p> {recipe["Cook Time"]} minutes </p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <p>Level:</p>
                                <p>{recipe.Level} </p>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <p>Ingredients: </p>
                                <p>{recipe.Ingredients.join(", ")}</p>
                            </div>
                        </div>
                        <div className="item">
                            <a href={recipe.Link} target="_blank" rel="noreferrer">
                                <div className="content">
                                    <p>Click here to get the recipe </p>
                                </div>   
                            </a>
                        </div>
                    </div>                    
                </div>
            ))}
                </div>
                : 
                <div className="error-message">
                    <p> No available recipes, please add more ingredients to your inventory! </p>
                </div>
            }
        </div>
    )
}
 
export default connect(mapStateToProps)(Recipes)
