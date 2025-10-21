import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameStageCard from "./GameStageCard";

const GameStages: React.FC = () => {
  return (
    <div>
        <GameStageCard
            to="/stage1"
            name="Stage 1"
            description="Doing stuff in Stage 1."
        />
        <GameStageCard
            to="/stage2"
            name="Stage 2"
            description="Doing stuff in Stage 2."
        />
    </div>
  );
};

export default GameStages;