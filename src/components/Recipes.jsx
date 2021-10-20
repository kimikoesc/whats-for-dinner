import { onSnapshot, collection } from '@firebase/firestore';
import React, { useState, useEffect } from 'react'
import db from "../firebase-config";
import "../styles/Recipes.css";
import store from "../store";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { userID: state.userID, inventory: state.userData, filters: state.filterOption}
  };

function Recipes(props) {
    const [allRecipe, setAllRecipe] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const { inventory, filters, userID } = props;

    useEffect(() => {
        onSnapshot(collection(db, "Recipes"), (snapshot) => {
            setAllRecipe(snapshot.docs.map(doc => doc.data()));
        });
        
    }, []);

    useEffect(() => {
    const getPossibleRecipe = () => {
        let result = [];
        for (let i = 0; i < allRecipe.length; i++) {
            if (filters.vegan === true && filters.pescatarian === true) {
                if (allRecipe[i].Ingredients.every(item => inventory.includes(item)) && allRecipe[i].Vegan === 1) {
                    result.push(allRecipe[i])
                } 
            }

            if (filters.vegan === true && filters.pescatarian === false) {
                if (allRecipe[i].Ingredients.every(item => inventory.includes(item)) && allRecipe[i].Vegan === 1 && allRecipe[i].Pescatarian === 0) {
                    result.push(allRecipe[i])
                } 
            }

            else {
                if (allRecipe[i].Ingredients.every(item => inventory.includes(item))) {
                    result.push(allRecipe[i])
                } 
            }

        }
        setRecipes(result);
    };
    getPossibleRecipe();
    }, [inventory, allRecipe]);

    console.log(allRecipe);
    console.log(recipes);

    return (
        <div className="recipe">
            <h1> List of Recipes you can make </h1>
            {recipes.map(recipe => (
                <div className="recipe-container">
                    <img key={recipes.indexOf(recipe)} src={recipe.Image} alt={recipe.Name}></img>
                    <h2 key= {recipe.Name} > { recipe.Name }</h2>
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
    )
}
 
export default connect(mapStateToProps)(Recipes)
