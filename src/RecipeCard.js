import React from "react";

const RecipeCard = ({ recipe, diets }) => {
  return (
    <div className="recipe">
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
};

export default RecipeCard;