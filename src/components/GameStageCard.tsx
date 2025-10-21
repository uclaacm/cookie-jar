import React from 'react';
import './../styles/Cookie.scss';
import { Link } from 'react-router-dom';

interface GameStageCardProps {
    to: string;
    name: string;
    description: string;
}

const GameStageCard: React.FC<GameStageCardProps> = ({ to, name, description }) => {
  return (
    <div className="gamestagecard">
        <Link to={to}>
            <div>{name}</div>
            <div>{description}</div>
        </Link>
    </div>
  );
};

export default GameStageCard;