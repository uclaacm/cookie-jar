import React from 'react';
import './../styles/Cookie.scss';

interface CookieCardProps {
    name: string;
    image: string;
    onClick: () => void;
}

const CookieCard: React.FC<CookieCardProps> = ({ name, image, onClick }) => (
    <div className="cookie-card">
        <div onClick={onClick}>
            <img src={image} alt={name} className="cookie-image" />
            <h3>{name}</h3>
        </div>
        <button className="buy-button" onClick={(e) => {
            e.stopPropagation();
            console.log(`Buying ${name}`);
        }}>
            Buy this cookie
        </button>
    </div>
);


export default CookieCard;