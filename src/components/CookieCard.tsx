import React from 'react';
import cookieImage from '../assets/cookie.svg'
import './../styles/Cookie.scss';

interface CookieCardProps {
  name: string;
  type: string;
  onClick: () => void;
}

const CookieCard: React.FC<CookieCardProps> = ({ name, type, onClick }) => {
  return (
    <div className="cookie">
      <p>{name}</p>
      <img
        src={cookieImage}
        alt={name} //for accessibility
        onClick={onClick}
        className="cookie-image"
      />
    </div>
  );
};

export default CookieCard;