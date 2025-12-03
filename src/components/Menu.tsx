import React, { useState } from 'react';
import './../styles/Cookie.scss';
import CookieCard from './CookieCard';
import CookieExpandedView from './CookieExpandedView';
import c1 from "/assets/c1.png";
import c2 from "/assets/c2.png";
import c3 from "/assets/c3.png";
import c5 from "/assets/c5.png";
import c6 from "/assets/c6.png";
import c7 from "/assets/c7.png";

interface Cookie {
  name: string;
  type: string;
  description: string;
  image: string;
  color: string;
}

const Menu: React.FC = () => {
  const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);

    const cookies: Cookie[] = [
        {
          name: 'First Party Cookie',
          type: 'first-party',
          description: 'First-party cookies are set by the website you visit. They enable core functionality like remembering your login status, language preferences, and other site-specific settings. These cookies are generally considered essential for a good user experience and are less privacy-invasive since they only work on the domain that created them.',
          image: c3,
          color: '#8B6F47'
        },
        {
          name: 'Third Party Cookie',
          type: 'third-party',
          description: 'Third-party cookies are set by external services. They are primarily used for advertising, cross-site tracking, and retargeting. These cookies can track your browsing activity across multiple websites, which raises privacy concerns and has led to browsers implementing restrictions on their use.',
          image: c6,
          color: '#F5DEB3'
        },
        {
          name: 'Session Cookie',
          type: 'session',
          description: 'This is a session cookie used for temporary sessions. Session cookies are deleted when you close your browser and are typically used to maintain state during a browsing session, such as keeping items in a shopping cart. They expire once the browser session ends, providing temporary data storage without long-term tracking concerns.',
          image: c1,
          color: '#A0826D'
        },
        {
          name: 'Persistent Cookie',
          type: 'persistent',
          description: 'A persistent cookie lasts beyond the session. These cookies remain stored on your device even after you close your browser. They are commonly used to remember login information, user preferences, and tracking data for analytics purposes. Persistent cookies can last for days, weeks, or even years, making them ideal for long-term data storage and user experience personalization.',
          image: c2,
          color: '#F5DEB3'
        },
        {
          name: 'Zombie Cookie',
          type: 'zombie',
          description: 'Zombie cookies are persistent tracking cookies that recreate themselves after deletion. Also known as "evercookies," these cookies store data in multiple locations such as Flash storage, HTML5 local storage, and other browser storage mechanisms. Even when users delete their cookies, zombie cookies can regenerate from backup copies, making them extremely difficult to remove and raising significant privacy concerns.',
          image: c7,
          color: '#8B6F47'
        },
        {
          name: 'Secure Cookie',
          type: 'secure',
          description: 'Secure cookies are only transmitted over HTTPS connections. This ensures that the cookie data is encrypted during transmission, protecting sensitive information from being intercepted by malicious actors. The Secure flag is essential for cookies containing authentication tokens or other sensitive data.',
          image: c5,
          color: '#F5DEB3'
        }
    ];


  const showPopup = (cookie: Cookie) => {
    setSelectedCookie(cookie);
  };

  const closePopup = () => {
    setSelectedCookie(null);
  };

  return (
    <div className="cookie-grid">
        {cookies.map((cookie, index) => (
            <CookieCard
                key={`${cookie.name}-${index}`}
                name={cookie.name}
                image={cookie.image}
                onClick={() => showPopup(cookie)}
            />
        ))}


        {selectedCookie && (
          <CookieExpandedView
            name={selectedCookie.name}
            description={selectedCookie.description}
            color={selectedCookie.color}
            onClose={closePopup}
          />
        )}
    </div>
  );
};

export default Menu;