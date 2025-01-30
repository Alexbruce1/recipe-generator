import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

const RecipeDetails = ({ recipes, fetchRecipeById }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  const [visibleRecipe, setVisibleRecipe] = useState({});

  useEffect(() => {
    const fetchAndSetRecipe = async () => {
      if (!recipe || !recipe.extendedIngredients) {
        try {
          const fetchedRecipe = await fetchRecipeById(id);
          if (fetchedRecipe) {
            setVisibleRecipe(fetchedRecipe);
          }
        } catch (error) {
          console.error("Error fetching recipe by ID:", error);
        }
      } else {
        setVisibleRecipe(recipe);
      }
    };

    fetchAndSetRecipe();
  }, [recipe, id, fetchRecipeById]);

  const processedSummary = visibleRecipe.summary
    ? visibleRecipe.summary.replace(/<a/g, "<a")
    : "No summary available.";

  const processedInstructions = visibleRecipe.summary
    ? visibleRecipe.instructions.replace(/<a/g, "<a")
    : "No summary available.";

  return visibleRecipe ? (
    <div className="recipe-details">
      {visibleRecipe.image && (
        <img
          className="recipe-bg-image"
          src={visibleRecipe.image}
          alt={visibleRecipe.title || "Recipe"}
        />
      )}
      <div className="recipe-details-top-section">
        <a
          className="recipe-details-title"
          target="_blank"
          href={visibleRecipe.sourceUrl || "#"}>
          {visibleRecipe.title
            ? visibleRecipe.title
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
            : "No Title"}
        </a>
        <div className="recipe-details-tags">
          {visibleRecipe.diets?.length > 0 &&
            visibleRecipe.diets.map((tag, index) => (
              <p key={index} className="recipe-details-tag">
                {tag
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            ))}
        </div>
      </div>
      <div className="recipe-details-bottom-section">
        <p className="ready-in-minutes">Ready in {visibleRecipe.readyInMinutes} minutes</p>
        <p
          className="recipe-details-summary"
          dangerouslySetInnerHTML={{ __html: processedSummary }}
        ></p>
        <div className="recipe-details-second-row">
          <div className="recipe-details-ingredients">
            <h2 className="recipe-details-header">Ingredients</h2>
            <p className="recipe-details-ingredient-list">{visibleRecipe.servings} servings</p>
            <ul className="recipe-details-ingredient-list">
              {visibleRecipe.extendedIngredients?.map((ingredient, index) => (
                <li 
                  key={index}
                  className="ingredient-item">
                    <p className="ingredient-amount">{ingredient.original}</p>
                  </li>
              ))}
            </ul>
          </div>
        </div>
        {visibleRecipe.analyzedInstructions?.length > 0 && (
          <div className="recipe-details-instructions">
            <h2 className="recipe-details-header">Instructions</h2>
            <div className="recipe-details-instruction-list">
              {visibleRecipe.analyzedInstructions?.[0].steps.map((step, index) => (
                <div key={index} className="instruction-item">
                  <div className="instruction-item-top-line">
                    <p className="instruction-number">{index + 1}</p>
                    <p className="instruction-time">{step?.length?.number} {step?.length?.unit}</p>
                  </div>
                  <p className="instruction-text">{step?.step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="recipe-details">
      <h1 className="recipe-details-title">Recipe Not Found</h1>
    </div>
  );
};

export default RecipeDetails;