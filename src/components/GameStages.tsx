import React from "react";
import GameStageCard from "./GameStageCard";
import "../styles/GameStages.scss";

const GameStages: React.FC = () => {
    return (
        <div className="game-stage-cards-container">
            <GameStageCard
                to="/stage1"
                name="Stage 1"
                description="Pick and choose a cookie!"
            />
            <GameStageCard
                to="/stage2"
                name="Stage 2"
                description="Learn how website cookies are made!"
            />
            <GameStageCard
                to="/stage3"
                name="Stage 3"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <GameStageCard
                to="/stage4"
                name="Stage 4"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <GameStageCard
                to="/stage5"
                name="Stage 5"
                description="Placeholder"
            />
            <GameStageCard
                to="/stage6"
                name="Stage 6"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />
            <GameStageCard
                to="/stage7"
                name="Stage 7"
                description="See how zombie cookies can come back after being deleted."
            />
        </div>
    );
};

export default GameStages;