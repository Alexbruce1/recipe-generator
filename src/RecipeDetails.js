import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <p>Recipe not found. Try going back and selecting another recipe.</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description || "No description available."}</p>
      {/* Add more details about the recipe here */}
    </div>
  );
};

export default RecipeDetails;