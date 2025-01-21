import React, { useState } from "react";
import logo from "./assets/logo.svg";
import "./App.css";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (e) => {
    setIngredients(e.target.value);
  };

  const fetchRecipe = async () => {
    const formattedIngredients = ingredients.replace(" ", "+");

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?ingredients=${formattedIngredients}&apiKey=${apiKey}&number=5`
      );
      const data = await response.json();

      console.log("data:", data.recipes);
  
      if (data.recipes && data.recipes.length > 0) {
        setRecipes(data.recipes);
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
        <img
          className="app-header-logo"
          src={logo} />
      </header>
      <div className="app-content">
        <h1>Random Recipe Generator</h1>
        <form 
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            fetchRecipe();
          }}>
          <input
            type="text"
            value={ingredients}
            className="search-ingredients-input"
            onChange={handleInputChange}
            placeholder="Enter ingredients separated by commas"/>
          <button
            type="submit"
            className="get-recipe-button">
            Get Recipe
          </button>
        </form>
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