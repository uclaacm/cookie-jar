import React from 'react';
import './../styles/Cookie.scss';
import "../styles/GameStages.scss";
import { Link } from 'react-router-dom';

interface GameStageCardProps {
    to: string;
    name: string;
    description: string;
}

const GameStageCard: React.FC<GameStageCardProps> = ({ to, name, description }) => {
  return (
    <div style={{ margin: "16px" }}>
        <Link to={to} style={{ textDecoration: "none" }}>
            <div className="game-stage-card">
                <div className="game-stage-card-title">{name}</div>
                <div className="game-stage-card-desc">{description}</div>
            </div>
        </Link>
    </div>
  );
};

export default GameStageCard;