import React from "react";
import { useState } from "react";
import "../../styles/Game_Stage2.scss";
import ShoppingCart from "/assets/ShoppingCart.png";
import Clara from "/assets/Clara.png";
import ChatBubble from "/assets/ChatBubble.png";
import Cookie1 from "/assets/c1.png";
import Cookie2 from "/assets/c2.png";
import Cookie3 from "/assets/c3.png";
import Cookie4 from "/assets/c4.png";
import Cookie5 from "/assets/c5.png";
import Cookie6 from "/assets/c6.png";
import Cookie7 from "/assets/c7.png";
import Cookie8 from "/assets/c8.png";
import Cookie9 from "/assets/c9.png";

const GameStage2: React.FC = () => {
  interface Cookie {
    id: number;
    label: string;
    img: string;
  }

  const [inGameMode, setGameMode] = useState(false);
  const [score, setScore] = useState(0);

  const cookies: Cookie[] = [
    {
      id: Date.now(),
      label: "Name1",
      img: Cookie1,
    },
    {
      id: Date.now() + 1,
      label: "Name2",
      img: Cookie2,
    },
    {
      id: Date.now() + 2,
      label: "Name3",
      img: Cookie3,
    },
    {
      id: Date.now() + 3,
      label: "Name4",
      img: Cookie4,
    },
    {
      id: Date.now() + 4,
      label: "Name5",
      img: Cookie5,
    },
    {
      id: Date.now() + 5,
      label: "Name6",
      img: Cookie6,
    },
    {
      id: Date.now() + 6,
      label: "Name7",
      img: Cookie7,
    },
    {
      id: Date.now() + 7,
      label: "Name8",
      img: Cookie8,
    },
    {
      id: Date.now() + 8,
      label: "Name9",
      img: Cookie9,
    },
  ];

  function startGame() {
    console.log("here");
    setGameMode(true);
  }

  return (
    <div className="game-stage2-container">
      {!inGameMode ? (
        <div>
          <h1>Stage 3</h1>
          <p style={{ paddingTop: "20px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className="start-button" onClick={() => startGame()}>
            Start
          </button>
          <div className="customer-container">
            <img src={ShoppingCart} alt="Shopping cart" />
            <img
              src={Clara}
              alt="Person holding shopping cart"
              style={{ position: "relative", left: "-12px" }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
          }}
        >
          <div className="game-mode-background"></div>
          <div className="game-mode-container">
            <div className="cookie-container">
              <img src={Cookie2} alt="sprinkle cookie"></img>
              <img src={Cookie1} alt="white chocolate chip cookie"></img>

              <img src={Cookie3} alt="cookie"></img>
              <img src={Cookie6} alt="peanut butter cookie"></img>

              <img src={Cookie5} alt="cookie with heart"></img>
              <img
                src={Cookie4}
                alt="cookie with lattice design frosting"
              ></img>
              <img src={Cookie9} alt="half chocolate cookie"></img>
              <img src={Cookie8} alt="chocolate chip cookie"></img>
              <img src={Cookie7} alt="pink frosted cookie"></img>
            </div>
            <p
              style={{
                marginLeft: "35px",
                marginTop: "10px",
                fontSize: "32px",
              }}
            >
              Server
            </p>
            <div className="customer-container">
              <img src={ShoppingCart} alt="Shopping cart" />
              <img
                src={Clara}
                alt="Person holding shopping cart"
                style={{ position: "relative", left: "-12px" }}
              />
            </div>
            <p className="player-score">Score: {score}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStage2;
