import React from 'react';
import './../styles/Cookie.scss';

interface CookieExpandedViewProps {
  name: string;
  description: string;
  image: string;
  color: string;
  onClose: () => void;
}

const CookieExpandedView: React.FC<CookieExpandedViewProps> = ({
  name,
  description,
  image,
  color,
  onClose
}) => {
  // Calculate text color based on background luminance
  const getTextColor = (bgColor: string): string => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return dark text for light backgrounds, light text for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const textColor = getTextColor(color);

  return (
    <div className="cookie-expanded-overlay" onClick={onClose}>
      <div
        className="cookie-expanded-view"
        style={{ backgroundColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cookie-expanded-header">
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="cookie-expanded-content">
          <div className="cookie-info-box">
            <h2 className="cookie-title" style={{ color: textColor }}>{name}</h2>
            <div className="cookie-description-box">
              <p className="cookie-description" style={{ color: textColor }}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieExpandedView;
