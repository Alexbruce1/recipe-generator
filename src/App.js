import React, { useState } from "react";
import "./App.css";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipe, setRecipe] = useState(null);

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const fetchRecipe = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&tags=${ingredient}&apiKey=${apiKey}`
      );
      const data = await response.json();
  
      if (data.recipes && data.recipes.length > 0) {
        const randomRecipe = {
          title: data.recipes[0].title || "Untitled Recipe",
          image: data.recipes[0].image || "https://via.placeholder.com/150",
          description: (data.recipes[0].summary || "No description available.").replace(/<\/?[^>]+(>|$)/g, ""),
        };
        setRecipe(randomRecipe);
      } else {
        setRecipe({
          title: "No recipes found",
          image: "https://via.placeholder.com/150",
          description: "Try a different ingredient or combination.",
        });
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setRecipe({
        title: "Error fetching recipe",
        image: "https://via.placeholder.com/150",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="App">
      <h1>Random Recipe Generator</h1>
      <input
        type="text"
        value={ingredient}
        onChange={handleInputChange}
        placeholder="Enter an ingredient"
        style={{ padding: "10px", marginBottom: "10px", width: "80%" }}
      />
      <br />
      <button
        onClick={fetchRecipe}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Get Recipe
      </button>
      {recipe && (
        <div style={{ marginTop: "20px" }}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} style={{ maxWidth: "300px" }} />
          <p>{recipe.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;