import React, { useState } from "react";
import logo from "./assets/logo.svg";
import clear from "./assets/clear.svg";
import carrot from "./assets/carrot.svg";
import cheese from "./assets/cheese.svg";
import salad from "./assets/salad.svg";
import wheat from "./assets/wheat.svg";
import egg from "./assets/small-icons/egg.svg";
import nut from "./assets/small-icons/nut.svg";
import vegetarian from "./assets/small-icons/vegetarian.svg";
import vegan from "./assets/small-icons/vegan.svg";
import gf from "./assets/small-icons/gf.svg";
import dairy from "./assets/small-icons/dairy.svg";
import fodmap from "./assets/small-icons/fodmap.svg";
import primal from "./assets/small-icons/primal.svg";
import paleo from "./assets/small-icons/paleo.svg";
import whole30 from "./assets/small-icons/whole30.png";
import "./App.css";

const diets = {
  "lacto ovo vegetarian": vegetarian,
  "vegan": vegan,
  "gluten free": gf,
  "dairy free": dairy,
  "paleolithic": paleo,
  "primal": primal,
  "fodmap friendly": fodmap,
  "whole 30": whole30,
}

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

  // const fetchRecipe = async () => {
  //   const formattedIngredients = ingredientList.join(",+").replace(" ", "");
  //   console.log("fetchRecipe", formattedIngredients);
  // }
  
  const fetchRecipe = async () => {
    const formattedIngredients = ingredientList.join(",+").replace(" ", "");
    
    console.log("fetchRecipe", formattedIngredients);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?ingredients=${formattedIngredients}&apiKey=${apiKey}&number=5&ranking=1&include-tags=${includedTags.join(",")}`
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
          <h3 className="search-ingredients-tags-title">Dietary Restrictions</h3>
          <div className="search-ingredients-tags">
            <div 
              className={includedTags.includes("gluten-free") ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
              data-name="gluten-free"
              onClick={assignTag}>
              <img 
                className="search-ingredient-tag-icon" 
                src={wheat} />
                Gluten Free
            </div>
            <div 
              className={includedTags.includes("vegetarian") ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
              data-name="vegetarian"
              onClick={assignTag}>
              <img 
                className="search-ingredient-tag-icon" 
                src={salad} />
                Vegetarian
            </div>
            <div 
              className={includedTags.includes("vegan") ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
              data-name="vegan"
              onClick={assignTag}>
              <img 
                className="search-ingredient-tag-icon" 
                src={carrot} />
                Vegan
            </div>
            <div 
              className={includedTags.includes("dairy-free") ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
              data-name="dairy-free"
              onClick={assignTag}>
              <img 
                className="search-ingredient-tag-icon" 
                src={cheese} />
                Dairy Free
            </div>
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
                            {!diets[tag] && ( {tag} )}
                          <img 
                            className="recipe-tag-icon" 
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