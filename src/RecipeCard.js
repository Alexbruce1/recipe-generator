import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, diets }) => {
  return (
    <Link 
      key={recipe.id} 
      className="recipe-link"
      to={`/recipes/${recipe.id}`}>
      <div 
        className="recipe-image"
        style={{backgroundImage: `url(${recipe.image})`}}
        role="img"
        aria-label={recipe.title}></div>
      <div className="recipe">
        <h2 className="recipe-card-title">{recipe.title}</h2>
      </div>
    </Link>
  )
};

export default RecipeCard;