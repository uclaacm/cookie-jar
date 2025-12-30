import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { useState, useEffect, useRef } from "react";
import "../../styles/Stage6.scss";
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

interface ShoppingCartProps {
  onDrop: (cookieId: number) => void;
}

interface CookieProps {
  id: number;
  img: string;
  label: string;
}

interface DraggedCookie {
  id: number;
}

interface DropCollectedProps {
  isOver: boolean;
}

const COOKIE_TYPE = "COOKIE";
function Cookie({ id, img, label }: CookieProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: COOKIE_TYPE,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className="cookie-wrapper"
      style={{
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <img src={img} alt={label} className="cookie-image" />
      {label != "" && <span className="cookie-label">{label}</span>}
    </div>
  );
}

function ShoppingCartDropZone({ onDrop }: ShoppingCartProps) {
  const [{ isOver }, dropRef] = useDrop<DraggedCookie, void, DropCollectedProps>(() => ({
    accept: COOKIE_TYPE,
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <img
      ref={dropRef}
      src={ShoppingCart}
      alt="Shopping cart"
      style={{
        height: "46%",
        left: "40px",
        transition: "0.2s",
        transform: isOver ? "scale(1.05)" : "scale(1)",
        filter: isOver ? "drop-shadow(0 0 8px #00aaff)" : "none",
      }}
    />
  );
}

const GameStage6: React.FC = () => {
  interface Cookie {
    id: number;
    label: string;
    img: string;
  }

  interface Customer {
    id: number;
    name: string;
    img: string;
    cookies: [number]; // acceptable cookies (ID) for this customer
    text: string;
  }

  const initialCookies: Cookie[] = [
    {
      id: Date.now(),
      label: "",
      img: Cookie1,
    },
    {
      id: Date.now() + 1,
      label: "",
      img: Cookie2,
    },
    {
      id: Date.now() + 2,
      label: "",
      img: Cookie3,
    },
    {
      id: Date.now() + 3,
      label: "",
      img: Cookie4,
    },
    {
      id: Date.now() + 4,
      label: "",
      img: Cookie5,
    },
    {
      id: Date.now() + 5,
      label: "",
      img: Cookie6,
    },
    {
      id: Date.now() + 6,
      label: "",
      img: Cookie7,
    },
    {
      id: Date.now() + 7,
      label: "",
      img: Cookie8,
    },
    {
      id: Date.now() + 8,
      label: "",
      img: Cookie9,
    },
  ];

  const [inGameMode, setGameMode] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [cookies, setCookies] = useState(initialCookies);
  const [score, setScore] = useState(0);
  const scoreThisRound = useRef(20); // 20 points if got it on first try, 15 if on second, otherwise 10
  const currentCustomer = useRef(0); // index of customers array

  useEffect(() => {
    scoreThisRound.current = 20;
  }, [currentCustomer.current]);

  const customers: Customer[] = [
    {
      id: Date.now(),
      name: "Clara",
      img: Clara,
      cookies: [cookies[1].id],
      text: "Hi! My name is Clara. Can I get the sprinkle cookie?",
    },
    {
      id: Date.now() + 1,
      name: "Alex",
      img: Clara,
      cookies: [cookies[7].id],
      text: "Hi! My name is Alex. Can I get the chocolate chip cookie?",
    },
    {
      id: Date.now() + 2,
      name: "Matt",
      img: Clara,
      cookies: [cookies[5].id],
      text: "Hi! My name is Matt. Can I get the peanut butter cookie?",
    },
  ];

  function startGame() {
    setGameMode(true);
  }

  function restartStage() {
    setGameMode(false);
    setFinishedGame(false);
    setCookies(initialCookies);
    setScore(0);
    scoreThisRound.current = 20;
    currentCustomer.current = 0;
  }

  function nextCustomer() {
    if (currentCustomer.current === customers.length - 1) {
      setFinishedGame(true);
      return;
    }
    currentCustomer.current = currentCustomer.current + 1;
  }

  function onCookieDrop(cookieId: number) {
    if (customers[currentCustomer.current].cookies.includes(cookieId)) {
      const cookie = cookies.find((c) => c.id === cookieId);

      if (!cookie) {
        console.warn("Cookie not found");
        return;
      }
      setCookies((prev) =>
        prev.map((c) =>
          c.id === cookieId
            ? { ...c, label: customers[currentCustomer.current].name }
            : c
        )
      );

      setScore((prev) => prev + scoreThisRound.current);
      nextCustomer();
    } else {
      const newScore =
        scoreThisRound.current === 10 ? 10 : scoreThisRound.current - 5;
      scoreThisRound.current = newScore;
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-stage6-container">
        {!inGameMode ? (
          <div>
            <h1>Stage 6</h1>
            <p style={{ paddingTop: "20px" }}>
              In this stage, you’ll explore how session cookies help online stores remember what’s in a shopper’s cart. Customers will arrive with either empty or full carts, and it’s your job to move their cookie data between the server box and the customer. Drag a cookie to a customer to “restore” their saved items, or drag a new cookie back to the server when they leave so their cart can be remembered for later. When you close the shop at the end, all active sessions (and cookies) disappear—just like closing a browser window. Match each customer correctly to earn points and keep the store running smoothly!
            </p>
            <button className="start-button" onClick={() => startGame()}>
              Start
            </button>
            <div className="customer-container">
              <img
                src={ShoppingCart}
                alt="Shopping cart"
                style={{
                  position: "relative",
                  width: "300px"
                }} />
              <img
                src={Clara}
                alt="Person holding shopping cart"
                style={{
                  position: "relative",
                  left: "-12px",
                  width: "130px",   // adjust smaller or larger as needed
                  height: "auto",
                }}
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
              {!finishedGame ? (
                <div>
                  <div className="cookie-container">
                    {cookies.map((cookie) => (
                      <Cookie
                        key={cookie.id}
                        id={cookie.id}
                        img={cookie.img}
                        label={cookie.label}
                      />
                    ))}
                  </div>
                  {/* Old order of cookies: 2, 1, 3, 6, 5, 4, 9, 8, 7} */}
                  <p
                    style={{
                      marginLeft: "35px",
                      marginTop: "10px",
                      fontSize: "32px",
                    }}
                  >
                    Server
                  </p>
                  <div className="customer-container-game">
                    <div className="chat-bubble-container">
                      <img src={ChatBubble} alt="Chat bubble" />
                      <p className="chat-bubble-text">
                        {customers[currentCustomer.current].text}
                      </p>
                    </div>
                    <ShoppingCartDropZone
                      onDrop={(cookieId: number) => onCookieDrop(cookieId)}
                    />
                    <img
                      src={customers[currentCustomer.current].img}
                      alt="Person holding shopping cart"
                      style={{
                        position: "relative",
                        left: "20px",
                        height: "70%",
                      }}
                    />
                  </div>
                  <p className="player-score">Score: {score}</p>
                </div>
              ) : (
                <div className="stage-complete-container">
                  <h1>Completed Stage 6!</h1>
                  <p>Final score: {score}</p>
                  <button onClick={() => restartStage()}>Retry</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default GameStage6;
