import React from "react";
import GameStageCard from "./GameStageCard";
import "../styles/GameStages.scss";

const GameStages: React.FC = () => {
  return (
    <div className="game-stage-cards-container">
        <GameStageCard
            to="/stage1"
            name="Stage 1"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <GameStageCard
            to="/stage2"
            name="Stage 2"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
    </div>
  );
};

export default GameStages;