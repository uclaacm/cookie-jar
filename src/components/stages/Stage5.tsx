import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/Stage5.scss";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import plainCookie from "/assets/c11.png";
import chocolateCookie from "/assets/c8.png";

interface Cookie {
  id: number;
  type: "public" | "secret";
}
interface ConveyorBelt {
  id: number;
  label: "HTTP" | "HTTPS";
}

const GameStage4: React.FC = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [conveyors, setConveyors] = useState<ConveyorBelt[]>([
    { id: 1, label: "HTTP" },
    { id: 2, label: "HTTP" },
    { id: 3, label: "HTTP" },
    { id: 4, label: "HTTPS" },
    { id: 5, label: "HTTPS" },
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [banditVisible, setBanditVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const spawn = setInterval(() => {
      setCookies((prev) => {
        if (prev.length >= 10) {
          setGameOver(true);
          return prev;
        }
        const newCookie: Cookie = {
          id: Date.now(),
          type: Math.random() < 0.7 ? "public" : "secret",
        };
        return [...prev, newCookie];
      });
    }, 3000);

    return () => clearInterval(spawn);
  }, [gameOver]);

  const handleDrop = (result: DropResult) => {
    if (!result.destination) return;

    const cookieIndex = result.source.index;
    const cookie = cookies[cookieIndex];

    const beltId = result.destination.droppableId.replace("belt-", "");
    const belt = conveyors.find((c) => c.id.toString() === beltId);

    if (!belt) return;

    if (cookie.type === "secret" && belt.label === "HTTP") {
      setBanditVisible(true);
      setGameOver(true);
      return;
    }

    setScore((prev) => prev + 1);

    setCookies((prev) => prev.filter((c) => c.id !== cookie.id));

    setConveyors((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <div className="game-stage-4-container">
        {gameOver && (
          <div className="game-over-screen">
            <h1>GAME OVER</h1>
            <p>Your final score: {score}</p>
            <button
              onClick={() => {
                setCookies([]);
                setScore(0);
                setGameOver(false);
                setBanditVisible(false);
              }}
            >
              Restart
            </button>
          </div>
        )}
        <div className="title">Secure Cookies Game</div>

        <div className="score">Score: {score}</div>

        {gameOver && <div className="game-over">GAME OVER</div>}

        {banditVisible && (
          <div className="bandit">
            <img src="/assets/bandit.png" alt="Bandit" />
          </div>
        )}

        {showInstructions && (
          <div className="instructions-overlay">
            <div className="instructions-popup">
              <h2>How to Play</h2>
              <ul>
                <li>Drag cookies from the basket onto the conveyor belts.</li>
                <li>
                  “Secret” cookies (chocolate chip) must go on HTTPS belts only.
                </li>
                <li>
                  If a secret cookie is sent over HTTP, the bandit will steal it
                  → GAME OVER.
                </li>
                <li>Basket cannot have more than 10 cookies at a time.</li>
                <li>Score points for each cookie delivered safely.</li>
                <li>
                  Lesson: Secure cookies are sent only through HTTPS! Be sure to
                  keep your data safe from hackers!
                </li>
              </ul>
              <button onClick={() => setShowInstructions(false)}>Close</button>
            </div>
          </div>
        )}

        <button
          className="instructions-button"
          onClick={() => setShowInstructions(true)}
        >
          Instructions
        </button>

        <div className="game-layout">
          <div className="conveyors">
            {conveyors.map((conv) => (
              <Droppable droppableId={`belt-${conv.id}`}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`belt ${conv.label}`}
                  >
                    {conv.label}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          <Droppable droppableId="basket" direction="horizontal">
            {(provided) => (
              <div
                className="basket"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cookies.map((cookie, index) => (
                  <Draggable
                    key={cookie.id}
                    draggableId={cookie.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="cookie"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <img
                          src={
                            cookie.type === "public"
                              ? plainCookie
                              : chocolateCookie
                          }
                          alt={cookie.type}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default GameStage4;
