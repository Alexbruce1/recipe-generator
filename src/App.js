import React, { useState } from "react";
import logo from "./assets/logo.svg";
import clear from "./assets/clear.svg";
import "./App.css";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (e) => {
    setIngredient([e.target.value]);
  };

  const handleAddIngredient = () => {
    if (!ingredient) return;
    setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredientList];
    newIngredients.splice(index, 1);
    setIngredientList(newIngredients);
  }

  // const fetchRecipe = async () => {
  //   const formattedIngredients = ingredientList.join(",+").replace(" ", "");
  //   console.log("fetchRecipe", formattedIngredients);
  // }
  
  const fetchRecipe = async () => {
    const formattedIngredients = ingredientList.join(",+").replace(" ", "");
    
    console.log("fetchRecipe", formattedIngredients);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?ingredients=${formattedIngredients}&apiKey=${apiKey}&number=5`
      );
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
            src={logo} />
          <h1 className="header-page-title">Random Recipe Generator</h1>
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