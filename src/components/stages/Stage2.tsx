import React from "react";
import "../../styles/Stage2.scss";
import flour from "/assets/Flour.png";
import nest from "/assets/Nest.png";
import milk from "/assets/MilkCarton.png";
import sugar from "/assets/SpoonofSugar.png";
import knife from "/assets/Knife.png";
import cookies from "/assets/Cookies.png";
import bowl from "/assets/bowl.png";
import { Card } from "../../../node_modules/@mui/material/index";

const Stage2: React.FC = () => {
  interface Ingredient {
    id: number;
    name: string;
    img: string;
  }

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

  return (
    <div className="stage2-container">
      <h1 style={{ marginBottom: "30px" }}>Stage 2</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="stage2-graphics-container">
        <div className="ingredients-container">
          {ingredients.map((card) => (
            <div key={card.id} className="ingredient-card">
              <img src={card.img} alt={`${card.name} icon`} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
        <div className="bowl-container">
          <img src={bowl} alt="bowl" />
        </div>
      </div>
    </div>
  );
};

export default Stage2;
