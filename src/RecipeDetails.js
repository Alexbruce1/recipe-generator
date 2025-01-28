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

  return visibleRecipe ? (
    <div className="recipe-details">
      <img
        className="recipe-bg-image"
        src={visibleRecipe.image || ""}
        alt={visibleRecipe.title || "Recipe"}
      />
      <div className="recipe-image-overlay"></div>
      <div className="recipe-details-top-section">
        <a
          className="recipe-details-title"
          href={visibleRecipe.sourceUrl || "#"}
        >
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
        <p
          className="recipe-details-summary"
          dangerouslySetInnerHTML={{ __html: processedSummary }}
        ></p>
        <div className="recipe-details-second-row">
          <div className="recipe-details-ingredients">
            <h3>Ingredients</h3>
            <ul className="recipe-details-ingredient-list">
              {visibleRecipe.extendedIngredients?.map((ingredient, index) => (
                <li 
                  key={index}
                  className="ingredient-item">
                    <p className="ingredient-amount">{ingredient.amount}</p>
                    <p className="ingredient-unit">{ingredient.unit.includes("serving") ? "" : ingredient.unit}</p>
                    <p className="ingredient-name">{ingredient.originalName}</p>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="recipe-details">
      <h1 className="recipe-details-title">Recipe Not Found</h1>
    </div>
  );
};

export default RecipeDetails;