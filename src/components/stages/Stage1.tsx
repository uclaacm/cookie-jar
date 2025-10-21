import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
// import { useState, useEffect } from "react";
import "../../styles/Stage1.scss";
import c2 from "/assets/c2.png";
import c6 from "/assets/c6.png";
import c8 from "/assets/c8.png";
import c11 from "/assets/c11.png";

const Stage1: React.FC = () => {
  interface CookieSelect {
    id: number;
    name: string;
    img: string;
  }

  const cookies: CookieSelect[] = [
    {
      id: Date.now(),
      name: "chocolate chip",
      img: c8,
    },
    {
      id: Date.now() + 1,
      name: "snickerdoodle",
      img: c11,
    },
    {
      id: Date.now() + 2,
      name: "pink sugar",
      img: c2,
    },
    {
      id: Date.now() + 3,
      name: "peanut butter",
      img: c6,
    },
  ];


  function selectCookie(id: number) {
    console.log(id);
  }

  return (
    <div className="stage1-container">
      <h1>Stage 1</h1>
      <p>
        See how we can pick and choose? Websites use cookies to store our
        preferences— like what kind of cookies we like!
      </p>
      <div className="cookie-select-container">
        <h1>Pick your favorite cookie!</h1>
        <div className="cookie-container">
          {cookies.map((cookie) => (
            <Link to="/stage2">
              <div key={cookie.id} onClick={() => selectCookie(cookie.id)}>
                <img src={cookie.img} alt="chocolate chip cookie" />
                <p>{cookie.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Link to="/stage2" className="next-button">
          <ArrowRight />
      </Link>

    </div>
  );
};

export default Stage1;
