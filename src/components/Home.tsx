import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
import "../styles/App.scss";
import Button from "@mui/material/Button";
import jar from "/assets/jar.svg";
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
  id: number;
  left: number;
  img: string;
  landingY: number;
}

const CookieJarGame: React.FC = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [cookieCount, setCookieCount] = useState<number>(0);
  const [isFalling, setIsFalling] = useState(false);

  // Array of imported cookie images
  const cookieImages = [
    c1,
    c2,
    c3,
    c4,
    c5,
    c7,
    c8,
    c6,
    c1,
    c2,
    c6,
    c9,
    c4,
    c5,
    c3,
  ];
  const cookieLandingPositions = [
    630, 630, 600, 550, 530, 540, 475, 480, 430, 400, 390, 410, 350, 310, 315,
  ];
  const cookieLeft = [1, 27, 13, -8, 8, 27, -3, 29, 15, 0, -12, 27, 12, -5, 25];

  const MAX_COOKIES = 15;

  useEffect(() => {
    if (!isFalling && cookieCount < MAX_COOKIES) {
      spawnCookie();
    }
  }, [cookieCount, isFalling]);

  // Spawn a new cookie
  const spawnCookie = () => {
    if (cookieCount >= MAX_COOKIES) return;

    const index = cookieCount;
    const newCookie: Cookie = {
      id: Date.now(),
      left: cookieLeft[index],
      img: cookieImages[index],
      landingY: cookieLandingPositions[index],
    };

    // Append new cookie to the array (so previous cookies remain)
    setCookies((prev) => [...prev, newCookie]);
    setIsFalling(true);
  };

  const handleCookieLand = () => {
    setIsFalling(false);
    setCookieCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount === MAX_COOKIES) {
        // Jar is full -> let cookies remain for 2 seconds, then reset
        setTimeout(() => {
          setCookies([]);
          setCookieCount(0);
        }, 2000);
      }
      return nextCount;
    });
  };

  return (
    <div className="jar-area">
      {cookies.map((cookie) => (
        <div
          key={cookie.id}
          className="cookie"
          style={
            {
              left: `${cookie.left}%`,
              "--landingY": `${cookie.landingY}px`,
            } as React.CSSProperties
          }
          onAnimationEnd={handleCookieLand}
        >
          <img src={cookie.img} alt="cookie" />
        </div>
      ))}
      <img className="jar" src={jar} alt="jar" />
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-container">
      {/* Left Column: Text and Button */}
      <div className="left-section">
        <h1>Cookie Jar</h1>
        <p>
          What are web cookies? What type of cookies are out there? In Cookie
          Jar, we’ll learn all about web cookies and they make life easier. Have
          fun!
        </p>
        <Link to="/stage1">
          <Button className="start-button">Start Baking</Button>
        </Link>
      </div>

      {/* Right Column: Cookie Jar Animation */}
      <div className="right-section">
        <CookieJarGame />
      </div>
    </div>
  );
};

export default Home;
