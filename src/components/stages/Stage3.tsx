//Falling cookie game
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../styles/Stage3.scss";


interface CookieProps {
    data: {
        id: number;
        x: number;
        y: number;
        speed: number;
        width: number;
        height: number;
        type: string;
    }
}

interface BasketProps {
    basketX: number;
    basketWidth: number;
    setBasketX: React.Dispatch<React.SetStateAction<number>>;
    controls: {
        left: string;
        right:string;
    };
}

function checkCollision(cookie: any, basketX: number, basketY: number, basketWidth: number, basketHeight: number) {
    const nextY = cookie.y + cookie.speed;
    const basketTop = basketY;
    const basketBottom = basketY + basketHeight;
  
    return (
      cookie.x < basketX + basketWidth &&
      cookie.x + cookie.width > basketX &&
      (
        // either overlapping
        (cookie.y + cookie.height > basketTop && cookie.y < basketBottom)
        ||
        // or crossing between frames
        (cookie.y + cookie.height <= basketTop && nextY + cookie.height >= basketTop)
      )
    );
  }
  
function Basket({ basketX, basketWidth, setBasketX, controls }: BasketProps) {

    //Basket Movement
    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) =>{
        if(e.key === controls.left){
            setBasketX((x) => Math.max(0,x-60));
        }
        else if (e.key=== controls.right){
            setBasketX((x) => Math.min(window.innerWidth-basketWidth, x+60))
        }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () =>window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
          <div className = "instructions">Press ← → to move</div>
          <div className = "basket"
            style={{ left: basketX, width: basketWidth,}}
          />
          </>
      );
    }

function Cookie({data}:CookieProps){
    return (
        <div className="cookie"
        style={{
          position: "absolute",
          left: data.x,
          top: data.y, }}
        />
    );
}


export default function Stage3() {
    const [cookies, setCookies] = useState<CookieProps["data"][]>([]);
    const [isPaused, setIsPaused] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const Frames_per_spawn = 125;
    const frames_elapsed = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);

    const [basket1X, setBasket1X] = useState(100);
    const [basket3X, setBasket3X] = useState(300);
    const basket1XRef = useRef(basket1X);
    const basket3XRef = useRef(basket3X);
    const basketWidth = 100;
    const basketHeight = 36;


    useEffect(() => {
        basket1XRef.current = basket1X;
    }, [basket1X]);

    useEffect(() => {
        basket3XRef.current = basket3X;
    }, [basket3X]);


    useEffect(() => {
        const interval = setInterval(() => {
            if (isPaused||gameOver) return;

            frames_elapsed.current+=1;

            let should_spawn = false;
            if(frames_elapsed.current>=Frames_per_spawn){
                should_spawn = true;
                frames_elapsed.current = 0;
            }
        
            setCookies((oldCookies) => {
                let newScore = 0;
                const gameHeight = gameAreaRef.current?.clientHeight || window.innerHeight;
                const gameWidth = gameAreaRef.current?.clientWidth || window.innerWidth;
                const basketY = gameHeight - basketHeight -16;
                let updatedCookies = oldCookies.map(cookie => ({ ...cookie, y: cookie.y + cookie.speed }))
                .filter(cookie => {
                    const notOffScreen = cookie.y<gameHeight;
                    let targetX;
                    if (cookie.type === "basket1") targetX = basket1XRef.current;
                    else targetX = basket3XRef.current;
              
                    const notCollided = !checkCollision(cookie, targetX, basketY, basketWidth, basketHeight);
                    
                    if (!notCollided) newScore +=1;

                    return notOffScreen && notCollided});
                
                if (newScore > 0) setScore(prev => prev + newScore);
                if (should_spawn) {
                    const target = Math.random() < 0.5 ? "basket1" : "basket3";
                    updatedCookies.push({
                        id: Date.now(),
                        x: Math.random() * (gameWidth - 4 * 2) + 4,
                        y:-40,
                        speed:3,
                        width: 4,
                        height: 4,
                        type: target,
                    });
                }
                return updatedCookies;
        });      
    }, 16);
        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className = "gameArea" ref = {gameAreaRef}>
        <div className = "score">Score: {score}</div>
        <button className = "pause-button" onClick = {() => setIsPaused(prev => !prev)}>
            {isPaused ? "Resume": "Pause"}
        </button>
        <Basket basketX={basket1X} basketWidth={basketWidth} setBasketX={setBasket1X} controls={{ left: "a", right: "d" }}/>
        <Basket basketX={basket3X} basketWidth={basketWidth} setBasketX={setBasket3X} controls={{ left: "ArrowLeft", right: "ArrowRight" }}/>

           {cookies.map (cookie => (
            <div
            key = {cookie.id}
            className = {`cookie ${cookie.type === "basket1" ? "cookie-1": "cookie-3"}`}
            style = {{
                top: cookie.y,
                left: cookie.x,
            }} />
           ))} 
           {gameOver && (
        <div className="game-over-overlay">
                Game Over       
        </div>
        )}
        </div>
        
        );
    }
    
