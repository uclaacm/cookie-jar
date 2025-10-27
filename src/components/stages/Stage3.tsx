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
    }
}

interface BasketProps {
    basketX: number;
    basketWidth: number;
    setBasketX: React.Dispatch<React.SetStateAction<number>>;
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
  
function Basket({ basketX, basketWidth, setBasketX }: BasketProps) {

    //Basket Movement
    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) =>{
        if(e.key ==="ArrowLeft"){
            setBasketX((x) => Math.max(0,x-60));
        }
        else if (e.key==="ArrowRight"){
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
    const Frames_per_spawn = 125;
    const frames_elapsed = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);

    const [basketX, setBasketX] = useState(200);
    const basketXRef = useRef(basketX);
    const basketWidth = 100;
    const basketHeight = 36;


    useEffect(() => {
        basketXRef.current = basketX;
    }, [basketX]);


    useEffect(() => {
        const interval = setInterval(() => {
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
                    const notCollided = !checkCollision(cookie, basketXRef.current, basketY, basketWidth, basketHeight);
                    
                    if (!notCollided) newScore +=1;

                    return notOffScreen && notCollided});
                
                if (newScore > 0) setScore(prev => prev + newScore);

                if (should_spawn) {
                    updatedCookies.push({
                        id: Date.now(),
                        x: Math.random() * (gameWidth - 4 * 2) + 4,
                        y:-40,
                        speed:3,
                        width: 4,
                        height: 4,
                    });
                }
                return updatedCookies;
        });      
    }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className = "gameArea" ref = {gameAreaRef}>
        <div className = "score">Score: {score}</div>
        <Basket basketX={basketX} basketWidth={basketWidth} setBasketX={setBasketX} />
           {cookies.map (cookie => (
            <div
            key = {cookie.id}
            className = "cookie"
            style = {{
                top: cookie.y,
                left: cookie.x,
            }} />
           ))} 
        </div>
        );
    }
    
