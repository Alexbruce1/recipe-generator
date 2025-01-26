import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipes, dietIcons, fetchRecipeById }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));

  const [visibleRecipe, setVisibleRecipe] = useState({});

  useEffect(() => {
    const fetchAndSetRecipe = async () => {
      if (recipes.length === 0) {
        try {
          const fetchedRecipe = await fetchRecipeById(id);
          if (fetchedRecipe) {
            setVisibleRecipe(fetchedRecipe);
          }
        } catch (error) {
          console.error("Error fetching recipe by ID:", error);
        }
      } else {
        setVisibleRecipe(recipes.find((recipe) => recipe.id === parseInt(id)));
      }
    };
  
    fetchAndSetRecipe();
  }, [recipes, id]);
  
  return (
    <div className="recipe-details">
      <img 
        className="recipe-bg-image" 
        src={visibleRecipe && visibleRecipe.image} 
        alt={visibleRecipe && visibleRecipe.title} />
      <div className="recipe-image-overlay"></div>
      <div className="recipe-details-top-section">
        <h1 className="recipe-details-title">{visibleRecipe.title && visibleRecipe.title.split(" ").map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(" ")}</h1>
        <div className="recipe-details-tags">
          {visibleRecipe && visibleRecipe.diets > 0 && visibleRecipe.diets.map((tag, index) => {
            return (
              <div key={index} className="recipe-details-tag">
                <img 
                  className="recipe-details-tag-icon" 
                  alt={tag}
                  src={dietIcons[tag]} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;