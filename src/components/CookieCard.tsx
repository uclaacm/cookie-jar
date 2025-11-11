import React from 'react';
import './../styles/Cookie.scss';

interface CookieCardProps {
    name: string;
    image: string;
    onClick: () => void;
}

const CookieCard: React.FC<CookieCardProps> = ({ name, image, onClick }) => (
    <div className="cookie-card" onClick={onClick}>
        <img src={image} alt={name} className="cookie-image" />
        <h3>{name}</h3>
    </div>
);


export default CookieCard;