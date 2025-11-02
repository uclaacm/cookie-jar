import React from "react";
import { useState } from "react";
import "../../styles/Stage2.scss";
import flour from "/assets/Flour.png";
import nest from "/assets/Nest.png";
import milk from "/assets/MilkCarton.png";
import sugar from "/assets/SpoonofSugar.png";
import knife from "/assets/Knife.png";
import cookies from "/assets/Cookies.png";
import bowl from "/assets/bowl.png";
import bowlSubtract from "/assets/BowlSubtract.png";
import eggs from "/assets/Eggs.png";
import sugarMound from "/assets/Sugar.png";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Button,
  Card,
  ListItem,
} from "../../../node_modules/@mui/material/index";

const Stage2: React.FC = () => {
  interface Ingredient {
    id: number;
    name: string;
    img: string;
  }
  const [hideCardsInBackground, setHideCardsInBackground] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [addedIngredients, setAddedIngredients] = useState<Set<string>>(
    new Set()
  );

  const ingredients: Ingredient[] = [
    {
      id: Date.now(),
      name: "FLOUR",
      img: flour,
    },
    {
      id: Date.now() + 1,
      name: "EGGS",
      img: nest,
    },
    {
      id: Date.now() + 2,
      name: "MILK",
      img: milk,
    },
    {
      id: Date.now() + 3,
      name: "SUGAR",
      img: sugar,
    },
    {
      id: Date.now() + 4,
      name: "BUTTER",
      img: knife,
    },
    {
      id: Date.now() + 5,
      name: "TOPPINGS",
      img: cookies,
    },
  ];

  const ingredientDescriptions = {
    FLOUR:
      "Just like how flour is added to real cookies, login information (such as usernames and passwords) can be added and stored in web cookies!",
    EGGS: "Your browsing history can be stored in web cookies as well. Let's add some eggs in to represent all the sites you have visited.",
    MILK: "Personal data like name, address, and phone number can be stored in web cookies. Just like how milk isn't always added to real cookies, web cookies don't always contain this data!",
    SUGAR: "Time to add something sweet! Technical details like your IP address, browser type, and operating system can be included in a web cookie!",
    BUTTER:
      "Web cookies can store items in a shopping cart on an online shopping website. This can make your shopping experience smooth as butter!",
    TOPPINGS:
      "Last but not least! Web cookies can store user preferences, like what language or font size you like to read and view website content with. Let's add some toppings of your choice!",
  };

  function greyOutCards() {
    setHideCardsInBackground(true);
  }

  function selectIngredient(id: number) {
    if (hideCardsInBackground) return; // don't allow user to select a card if one is already selected
    const ingredientName = ingredients.find((item) => item.id === id).name;
    if (addedIngredients.has(ingredientName)) {
      return;
    }
    setSelectedIngredient(ingredientName);
    greyOutCards();
  }

  function addIngredient() {
    setAddedIngredients((prev) => new Set(prev).add(selectedIngredient));
    setHideCardsInBackground(false);
  }

  return (
    <div className="stage2-container">
      <h1 style={{ marginBottom: "30px" }}>Stage 2</h1>
      <p>
        Let's see how web cookies are made! Just like mixing ingredients makes
        cookie dough, websites mix bits of your info to make a web cookie.
      </p>
      <div className="stage2-graphics-container">
        <div className="ingredients-container">
          {ingredients.map((card) => (
            <div
              key={card.id}
              className={
                hideCardsInBackground
                  ? "ingredient-card-hidden"
                  : addedIngredients.has(card.name)
                    ? "ingredient-card ingredient-card-used"
                    : "ingredient-card"
              }
              onClick={() => selectIngredient(card.id)}
            >
              {!hideCardsInBackground ? (
                <>
                  <img src={card.img} alt={`${card.name} icon`} />
                  <p>{card.name}</p>
                </>
              ) : null}
            </div>
          ))}
          {hideCardsInBackground && (
            <div className="ingredient-card-selected">
              <p>{ingredientDescriptions[selectedIngredient]}</p>
              <button onClick={() => addIngredient()}>
                <p>
                  Add{" "}
                  {selectedIngredient.charAt(0) +
                    selectedIngredient.slice(1).toLowerCase()}
                </p>
              </button>
            </div>
          )}
        </div>
        <div className="bowl-container">
          <img
            src={bowlSubtract}
            alt="bowl"
            style={{ marginBottom: "-35px", zIndex: "-10" }}
          />
          <img src={bowl} alt="bowl" />
          {selectedIngredient === "EGGS" && hideCardsInBackground && (
            <img src={eggs} alt="eggs" className="eggs-icon" />
          )}
          {selectedIngredient === "SUGAR" && hideCardsInBackground && (
            <img src={sugarMound} alt="sugar" className="sugar-icon" />
          )}
        </div>
      </div>
      {addedIngredients.size === ingredients.length && (
        <button className="next-stage-button">Next Stage</button>
      )}
    </div>
  );
};

export default Stage2;
