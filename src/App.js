import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";
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
import RecipeCard from "./RecipeCard.js";

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

const fetchRecipeById = async (id) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [includedTags, setIncludedTags] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [randomRecipeId, setRandomRecipeId] = useState(null);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      let url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;
  
      const recipeData = await getRecipe(url);
  
      if (recipeData?.recipes?.length > 0) {
        setRandomRecipeId(recipeData.recipes[0].id);
      }
    };
  
    fetchRandomRecipe();
  }, []);

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
    let url;

    if (formattedIngredients.length === 0 && includedTags.length === 0) {
      url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch${formattedIngredients.length > 0 ? `?includeIngredients=${formattedIngredients}` : "?"}&apiKey=${apiKey}&number=10&ranking=1${includedTags.length > 0 ? `&tags=${formattedTags}&instructionsRequired=true` : ""}`;
    }

    const data = await getRecipe(url);

    if (data.results && data.results.length > 0) {
      setRecipes(data.results);
    } else if (data.recipes && data.recipes.length > 0) {
      setRecipes(data.recipes);
    } else {
      setRecipes({
        title: "No recipes found",
        image: "https://via.placeholder.com/150",
        description: "Try a different ingredient or combination.",
      });
    }

    console.log(data.recipes);
  };

  const getRecipe = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipes([
        {
          title: "Error fetching recipe",
          image: "https://via.placeholder.com/150",
          description: "Please try again later.",
        }
      ]);
    }
  }

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="app-header-container">
            <Link
              className="app-header-link"
              to={"/"}>Home</Link>
            <img
              className="app-header-logo"
              src={logo} 
              alt="Random Recipe Generator"
              onClick={() => window.location = '/'}/>
            <Link
              className="app-header-link"
              to={`/recipes/${randomRecipeId}`}>Random Recipe</Link>
            </div>
        </header>
        <Routes>
          <Route 
            path="/"
            element={
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
                              alt="Remove ingredient"
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
              {recipes && recipes.length > 0 && (
                <div className="recipe-list">
                  {recipes.map((recipe) => {
                    return (
                      <RecipeCard recipe={recipe} diets={diets} />
                    )
                  })}
                </div>
              )
              
              }
            </div>
          }/>
          <Route 
            path="/recipes/:id" 
            element={<RecipeDetails 
              recipes={recipes}
              fetchRecipeById={fetchRecipeById}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;