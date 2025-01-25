import React, { useState } from "react";
import logo from "./assets/logo.svg";
import clear from "./assets/clear.svg";
import vegetarian from "./assets/small-icons/vegetarian.svg";
import vegan from "./assets/small-icons/vegan.svg";
import gf from "./assets/small-icons/gf.svg";
import dairy from "./assets/small-icons/dairy.svg";
import fodmap from "./assets/small-icons/fodmap.svg";
import primal from "./assets/small-icons/primal.svg";
import paleo from "./assets/small-icons/paleo.svg";
import whole30 from "./assets/small-icons/whole30.png";
import drumstick from "./assets/small-icons/drumstick.svg";
import fish from "./assets/small-icons/fish.svg";
import "./App.css";
import SearchTag from "./SearchTag.js";

const diets = {
  "lacto ovo vegetarian": vegetarian,
  "vegan": vegan,
  "gluten free": gf,
  "dairy free": dairy,
  "paleolithic": paleo,
  "primal": primal,
  "fodmap friendly": fodmap,
  "whole 30": whole30,
  "ketogenic": drumstick,
  "pescatarian": fish
};
const dietaryRestrictions = ["gluten-free", "vegetarian", "vegan", "dairy-free"];
const dishes = ["breakfast", "brunch", "lunch", "dinner", "snack", "dessert", "main-dish", "side-dish", "appetizer", "salad", "soup"];

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [includedTags, setIncludedTags] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (e) => {
    setIngredient([e.target.value]);
  };

  const handleAddIngredient = () => {
    if (!ingredient) return;
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  const assignTag = event => {
    const tag = event.currentTarget.getAttribute("data-name");
    if (includedTags.includes(tag)) {
      const newTags = includedTags.filter((includedTag) => includedTag !== tag);
      setIncludedTags(newTags);
    } else {
      setIncludedTags([...includedTags, tag]);
    }
  }

  const removeIngredient = (index) => {
    const newIngredients = [...ingredientList];
    newIngredients.splice(index, 1);
    setIngredientList(newIngredients);
  }
  
  const fetchRecipe = async () => {
    const formattedIngredients = ingredientList.join(",").replace(" ", "");
    const formattedTags = includedTags.join(",").replace("-", "+");

    console.log(formattedTags)

    const url = `https://api.spoonacular.com/recipes/random?ingredients=${formattedIngredients}&apiKey=${apiKey}&number=5&ranking=1${includedTags.length > 0 ? `&tags=${formattedTags}` : ""}`;

    console.log(url)

    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
        console.log(data.recipes)
      } else {
        setRecipes({
          title: "No recipes found",
          image: "https://via.placeholder.com/150",
          description: "Try a different ingredient or combination.",
        });
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipes({
        title: "Error fetching recipe",
        image: "https://via.placeholder.com/150",
        description: "Please try again later.",
      });
    }

  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-header-container">
          <img
            className="app-header-logo"
            src={logo} 
            onClick={() => window.location.reload()}/>
          <h1 
            className="header-page-title"
            onClick={() => window.location.reload()}>Random Recipe Generator</h1>
        </div>
      </header>
      <div className="app-content">
        <div className="search-box">
          <form 
            className="search-ingredients-container" 
            onSubmit={(e) => {
              e.preventDefault();
              handleAddIngredient();
              }}>
            <div className="search-ingredients-top-line">
              <input
                type="text"
                value={ingredient}
                className="search-ingredients-input"
                onChange={handleInputChange}
                placeholder="Enter an ingredient that you want to use"/>
              <button
                className="form-button"
                type="submit">
                Add
              </button>
            </div>
            {ingredientList && ingredientList.length > 0 && (
              <div className="ingredient-list">
                {ingredientList.map((ingredient, index) => {
                  return (
                    <li key={index} className="ingredient-list-item">
                      {ingredient}
                      <img 
                        className="remove-item-x" 
                        src={clear} 
                        onClick={() => {
                          removeIngredient(index);
                        }}/>
                    </li>
                  )
                })}
                {ingredientList.length > 1 && (
                  <div 
                    className="ingredient-list-item clear-all-button"
                    onClick={() => setIngredientList([])}>
                    Clear all
                  </div>
                )}
              </div>
            )}
          </form>
          <h3 className="search-ingredients-tags-title">Dietary Restrictions</h3>
          <div className="search-ingredients-tags">
            {dietaryRestrictions.map((tag) => {
              return (
                <SearchTag 
                  includedTags={includedTags}
                  assignTag={assignTag}
                  tag={tag}/>
              )
            })}
          </div>
          <h3 className="search-ingredients-tags-title">Meals And Dishes</h3>
          <div className="search-ingredients-tags">
            {dishes.map((tag) => {
              return (
                <SearchTag 
                  includedTags={includedTags}
                  assignTag={assignTag}
                  tag={tag}/>
              )
            })}
          </div>
          <input
            onClick={fetchRecipe}
            type="button"
            value="Get Recipes"
            className="form-button"
          />
        </div>
        {recipes && recipes.length > 0 && recipes.map((recipe) => {
          return (
            <div key={recipe.id} className="recipe">
              <div className="recipe-top-section">
                {recipe.diets && recipe.diets.length > 0 && (
                  <div className="recipe-tags">
                    {recipe.diets.map((tag, index) => {
                      return (
                        <div 
                          key={index} 
                          className="recipe-tag">
                          <img 
                            className="recipe-tag-icon" 
                            alt={tag}
                            src={diets[tag]} />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <h2>{recipe.title}</h2>
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="recipe-image" />
              <p>{recipe.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default App;