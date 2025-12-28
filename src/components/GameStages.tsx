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
                description="Learn about persistent cookies and how web browsers remember user customizations."
            />
            <GameStageCard
                to="/stage4"
                name="Stage 4"
                description="Learn about first-party vs third-party cookies. First-party cookies are saved by the site you're using while third-party cookies are used across multiple sites and possibly shared."
            />
            <GameStageCard
                to="/stage5"
                name="Stage 5"
                description="Learn about secure cookies protect information during transmission."
            />
            <GameStageCard
                to="/stage6"
                name="Stage 6"
                description="Learn about session cookies that exist only within a single session."
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