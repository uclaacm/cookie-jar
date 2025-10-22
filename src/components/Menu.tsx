import React, { useState } from 'react';
import './../styles/Cookie.scss';
import CookieCard from './CookieCard';
import CookiePopup from './CookiePopup';
import c1 from "/assets/c1.png";
import c2 from "/assets/c2.png";
import c3 from "/assets/c3.png";
import c4 from "/assets/c4.png";
import c5 from "/assets/c5.png";
import c6 from "/assets/c6.png";
import c7 from "/assets/c7.png";
import c8 from "/assets/c8.png";
import c9 from "/assets/c9.png";

interface Cookie {
  name: string;
  type: string;
  description: string;
  image: string;
}

const Menu: React.FC = () => {
  const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);

    const cookies: Cookie[] = [
        { name: 'Persistent Cookie', type: 'persistent', description: 'A persistent cookie lasts beyond the session.', image: c2 },
        { name: 'Session Cookie', type: 'session', description: 'This is a session cookie used for temporary sessions.', image: c1 },
        { name: 'First Party Cookie', type: 'first-party', description: 'First-party cookies are set by the website you visit.', image: c3 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c6 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c5 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c4 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c9 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c8 },
        { name: 'Third Party Cookie', type: 'third-party', description: 'Third-party cookies are set by external services.', image: c7 }


    ];


  const showPopup = (cookie: Cookie) => {
    setSelectedCookie(cookie);
  };

  const closePopup = () => {
    setSelectedCookie(null);
  };

  return (
    <div className="cookie-grid">
        {cookies.map((cookie) => (
            <CookieCard
                key={cookie.name}
                name={cookie.name}
                image={cookie.image}      // pass image
                onClick={() => showPopup(cookie)}
            />
        ))}


        {selectedCookie && (
        <CookiePopup
          name={selectedCookie.name}
          description={selectedCookie.description}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default Menu;