import React from 'react';
import './../styles/Cookie.scss';

interface CookiePopupProps {
  name: string;
  description: string;
  onClose: () => void;
}

const CookiePopup: React.FC<CookiePopupProps> = ({ name, description, onClose }) => {
  return (
    <div className="cookie-popup">
      <div className="popup-content">
        <h2>{name}</h2>
        <div className="popup-description">
          <p>{description}</p>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;