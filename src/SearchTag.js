import React, { useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import carrot from "./assets/carrot.svg";
import cheese from "./assets/cheese.svg";
import salad from "./assets/salad.svg";
import wheat from "./assets/wheat.svg";
import breakfast from "./assets/breakfast.svg";
import brunch from "./assets/brunch.svg";
import lunch from "./assets/lunch.svg";
import dinner from "./assets/dinner.svg";
import snack from "./assets/snack.svg";
import dessert from "./assets/dessert.svg";
import mainDish from "./assets/main-dish.svg";
import sideDish from "./assets/side-dish.svg";
import appetizer from "./assets/appetizer.svg";
import saladIcon from "./assets/salad-2.svg";
import soup from "./assets/soup.svg";

import egg from "./assets/small-icons/egg.svg";
import nut from "./assets/small-icons/nut.svg";

const foodKey = [{
    tag: "gluten-free",
    text: "Gluten Free",
    icon: wheat
  }, {
    tag: "vegetarian",
    text: "Vegetarian",
    icon: salad
  }, {
    tag: "vegan",
    text: "Vegan",
    icon: carrot
  }, {
    tag: "dairy-free",
    text: "Dairy Free",
    icon: cheese
  }, {
    tag: "breakfast",
    text: "Breakfast",
    icon: breakfast
  }, {
    tag: "brunch",
    text: "Brunch",
    icon: brunch
  }, {
    tag: "lunch",
    text: "Lunch",
    icon: lunch
  }, {
    tag: "dinner", 
    text: "Dinner",
    icon: dinner
  }, {
    tag: "snack",
    text: "Snack",
    icon: snack
  }, {
    tag: "dessert",
    text: "Dessert",
    icon: dessert
  }, {
    tag: "main-dish",
    text: "Main Dish",
    icon: mainDish
  }, {
    tag: "side-dish",
    text: "Side Dish",
    icon: sideDish
  }, {
    tag: "appetizer",
    text: "Appetizer",
    icon: appetizer
  }, {
    tag: "salad",
    text: "Salad",
    icon: saladIcon
  }, {
    tag: "soup",
    text: "Soup",
    icon: soup
  }];

const SearchTag = ({ includedTags, assignTag, tag }) => {
  const [icon, setIcon] = useState({});
  const [tagText, setTagText] = useState("");

  useEffect(() => {
    console.log(tag)
    if (foodKey.find((category) => category.tag === tag)) {
      setIcon(foodKey.find((category) => category.tag === tag).icon);
    } else {
      setIcon(logo);
    }

    if (foodKey.find((category) => category.tag === tag)) {
      setTagText(foodKey.find((category) => category.tag === tag).text);
    } else {
      setTagText("N/A");
    }
  }, [tag]);

  return (
    <div 
      className={includedTags.includes(tag) ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
      data-name={tag}
      onClick={assignTag}>
      <img 
        className="search-ingredient-tag-icon" 
        src={icon}
        />
        {tagText}
    </div>
  )
};

export default SearchTag;