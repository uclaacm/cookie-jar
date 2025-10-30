import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../../styles/Stage2.scss";

import flour from "/assets/Flour.png";

const Stage2: React.FC = () => {
  interface InteractiveCards {
    id: number;
    name: string;
    img: string;
  }

  const cards: InteractiveCards[] = [
    {
      id: Date.now(),
      name: "FLOUR",
      img: flour,
    },
    {
      id: Date.now() + 1,
      name: "EGGS",
      img: flour,
    },
    {
      id: Date.now() + 2,
      name: "MILK",
      img: flour,
    },
    {
      id: Date.now() + 3,
      name: "SUGAR",
      img: flour,
    },
    {
      id: Date.now() + 4,
      name: "BUTTER",
      img: flour,
    },
    {
      id: Date.now() + 5,
      name: "TOPPINGS",
      img: flour,
    },
  ];


  return (
    <div className="stage2-container">
      <h1 style={{ marginBottom: "40px" }}>Stage 2</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <Link to="/stage1" className="back-button">
        <ArrowLeft />
      </Link>

      <Link to="/stage3" className="next-button">
        <ArrowRight />
      </Link>

    </div>
  );
};

export default Stage2;
