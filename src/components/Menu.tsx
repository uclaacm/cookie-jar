import React, { useState } from 'react';
import './../styles/Cookie.scss';
import CookieCard from './CookieCard';
import CookiePopup from './CookiePopup';

interface Cookie {
  name: string;
  type: string;
  description: string;
}

const Menu: React.FC = () => {
  const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);

  const cookies: Cookie[] = [
    { name: 'Session Cookie', type: 'session', description: 'This is a session cookie used for temporary sessions.' },
    { name: 'Persistent Cookie', type: 'persistent', description: 'A persistent cookie lasts beyond the session.' },
    { name: 'First Party Cookie', type: 'first-party', description: 'First-party cookies are set by the website you visit.' },
    { name: 'First Party Cookie', type: 'first-party', description: 'First-party cookies are set by the website you visit.' },
    { name: 'First Party Cookie', type: 'first-party', description: 'First-party cookies are set by the website you visit.' },
    { name: 'First Party Cookie', type: 'first-party', description: 'First-party cookies are set by the website you visit.' }// Add more cookies as needed
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
          key={cookie.type}
          name={cookie.name}
          type={cookie.type}
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