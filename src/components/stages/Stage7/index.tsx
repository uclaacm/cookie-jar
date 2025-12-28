import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Game } from "./Game.tsx";
import "../../../styles/Stage7.scss";

const Stage7: React.FC = () => {
  return (
    <div className="stage7-container">
      <h1>Stage 7</h1>

      <Game />

      <Link to="/stage6" className="back-button">
        <ArrowLeft />
      </Link>

      {/* TODO: hide this until the game has been won */}
      <Link to="/stage8" className="next-button">
        <ArrowRight />
      </Link>
    </div>
  );
};

export default Stage7;
