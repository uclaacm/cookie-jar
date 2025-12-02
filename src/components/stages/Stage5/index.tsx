import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Game } from "./Game.tsx";
import "../../../styles/Stage5.scss";

const Stage5: React.FC = () => {
  return (
    <div className="stage5-container">
      <h1>Stage 5</h1>

      <Game />

      <Link to="/stage4" className="back-button">
        <ArrowLeft />
      </Link>

      {/* TODO: hide this until the game has been won */}
      <Link to="/stage6" className="next-button">
        <ArrowRight />
      </Link>
    </div>
  );
};

export default Stage5;
