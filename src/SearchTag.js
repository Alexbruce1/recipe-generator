import React from "react";
import carrot from "./assets/carrot.svg";
import cheese from "./assets/cheese.svg";
import salad from "./assets/salad.svg";
import wheat from "./assets/wheat.svg";
import egg from "./assets/small-icons/egg.svg";
import nut from "./assets/small-icons/nut.svg";

const dietaryRestrictionsKey = [{
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
  }];

const SearchTag = ({ includedTags, assignTag, tag }) => {
  return (
    <div 
      className={includedTags.includes(tag) ? "search-ingredient-tag search-tag-active" : "search-ingredient-tag"}
      data-name={tag}
      onClick={assignTag}>
      <img 
        className="search-ingredient-tag-icon" 
        src={dietaryRestrictionsKey.find((restriction) => restriction.tag === tag).icon} />
        {dietaryRestrictionsKey.find((restriction) => restriction.tag === tag).text}
    </div>
  )
};

export default SearchTag;