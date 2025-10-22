import React from 'react';
import './../styles/Cookie.scss';

interface CookieCardProps {
    name: string;
    type: string;
    image: string;
    onClick: () => void;
}

const CookieCard: React.FC<CookieCardProps> = ({ name, type, image, onClick }) => (
    <div className="cookie-card" onClick={onClick}>
        <img src={image} alt={name} className="cookie-image" />
        <h3>{name}</h3>
        <p>{type}</p>
    </div>
);


export default CookieCard;