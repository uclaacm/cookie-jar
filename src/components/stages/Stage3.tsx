//Falling cookie game
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "../../styles/Stage3.scss";
 

interface CookieInfo {
    _id?: string;
    name: string;
    from: string;
    used_by: string;
    purpose: string;
    expires_in: string;
    type:"first"|"third";
  }

  
interface CookieProps {
    data: {
        id: number;
        x: number;
        y: number;
        speed: number;
        width: number;
        height: number;
        type: string;
        mongo_id: string;
        info:CookieInfo;
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
    typeBasket: "basket1" | "basket3";

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

function Basket({ basketX, basketWidth, setBasketX, controls, typeBasket}: BasketProps) {

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
          <div className = {`basket ${typeBasket === "basket1" ? "basket1" : "basket3"}`}
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
    const [clickedCookie, setClickedCookie] = useState<CookieProps["data"] | null>(null);
    const Frames_per_spawn = 125;
    const frames_elapsed = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [score, setScore] = useState(0);
    const [basket1X, setBasket1X] = useState(100);
    const [basket3X, setBasket3X] = useState(300);
    const usedCookieIds = useRef<Set<string>>(new Set());
    const basket1XRef = useRef(basket1X);
    const basket3XRef = useRef(basket3X);
    const basketWidth = 100;
    const basketHeight = 36;
    let OffScreen = false;

    function handleCookieClick(cookie: CookieProps["data"]){
        setIsPaused(true);
        setClickedCookie(cookie);
        setTimeout(() => {
            setIsPaused(false);
            setClickedCookie(null);
        }, 3000);
    }    


    async function spawnCookie(gameWidth: number){
        const target = Math.random() < 0.5 ? "basket1" : "basket3";
        let cookieType = target==="basket1"? "first" : "third";
        
        const exclude = Array.from(usedCookieIds.current).join(",");
        console.log("Exclude List:", exclude);
        let res = await fetch(`/api/cookies/random?type=${cookieType}&exclude=${exclude}`,
        {cache: "no-store"});
        let data = await res.json();
        if (!res.ok || !data._id) {
            console.log("Failed to get '${cookieType}', trying other type...");
                
            // Flip the type
            cookieType = (cookieType === "first") ? "third" : "first";
                
                // Try again with the *other* type
                res = await fetch(`/api/cookies/random?type=${cookieType}&exclude=${exclude}`, {
                  cache: "no-store"
                });
                data = await res.json();
        
                // 3. If *this* one also failed, then we are truly out of all cookies
                if (!res.ok || !data._id) {
                    console.log("No more cookies of *any* type available.");
                    return; // <-- This is the all-important RETURN
                }         }          
        usedCookieIds.current.add(data._id);

        const newCookie: CookieProps["data"] = {
            id: Date.now(),
            x: Math.random() * (gameWidth - 4 * 2) + 4,
            y:-40,
            speed:1,
            width: 4,
            height: 4,
            type: target,
            mongo_id: data._id,
            info: data,
        };
        setCookies(prev =>[...prev, newCookie]);
    }


    useEffect(() => {
        basket1XRef.current = basket1X;
    }, [basket1X]);

    useEffect(() => {
        basket3XRef.current = basket3X;
    }, [basket3X]);


    useEffect(() => {
        const interval = setInterval(() => {
            if(gameOver){
                usedCookieIds.current.clear();
                return;
            }

            if (isPaused){
                return;
            }

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
                const basketY = gameHeight - basketHeight - 16;
                let updatedCookies = oldCookies.map(cookie => ({ ...cookie, y: cookie.y + cookie.speed }))
                .filter(cookie => {
                    if (cookie.y>=gameHeight) OffScreen = true;
                    let basket1XPos = basket1XRef.current;
                    let basket3XPos = basket3XRef.current;

                    const collidedWithBasket1 = checkCollision(cookie, basket1XPos, basketY, basketWidth, basketHeight);
                    const collidedWithBasket3 = checkCollision(cookie, basket3XPos, basketY, basketWidth, basketHeight);

                    if(collidedWithBasket1||collidedWithBasket3){
                        if((cookie.type==="basket1"&&collidedWithBasket1)||(cookie.type==="basket3"&&collidedWithBasket3)){
                            newScore +=1;}
                        else{
                            setGameOver(true)
                        }
                    }

                    return !collidedWithBasket1 && !collidedWithBasket3});
                
                if (newScore > 0) setScore(prev => prev + newScore);
                if (OffScreen) setGameOver(true);
                if (should_spawn) {
                    spawnCookie(gameWidth); //fix this later cuz like why are we sorting cookies and then spawning them we have a useless variable here
                    console.log("should_spawn:", should_spawn);
                }
                return updatedCookies;
        });      
    }, 16);
        return () => clearInterval(interval);
    }, [isPaused, gameOver]);

    return (
        <div className = "gameArea" ref = {gameAreaRef}>
        <div className = "score">Score: {score}</div>
        <button className = "pause-button" onClick = {() => setIsPaused(prev => !prev)}>
            {isPaused ? "Resume": "Pause"}
        </button>
        <Basket basketX={basket1X} basketWidth={basketWidth} setBasketX={setBasket1X} controls={{ left: "a", right: "d" }} typeBasket = "basket1"/>
        <Basket basketX={basket3X} basketWidth={basketWidth} setBasketX={setBasket3X} controls={{ left: "ArrowLeft", right: "ArrowRight" }} typeBasket = "basket3"/>

           {cookies.map (cookie => (
            <div
            key = {cookie.id}
            className = {`cookie ${cookie.type === "basket1" ? "cookie-1": "cookie-3"}`}
            style = {{
                top: cookie.y,
                left: cookie.x,
            }}onClick={()=> handleCookieClick(cookie)} />
           ))} 
           {clickedCookie && (
            <div className = "cookie-overlay">
                <h3>🍪 Cookie Info Card</h3>
                <p>Name: {clickedCookie.info.name}</p>
                <p>From: {clickedCookie.info.from}</p>
                <p>Used By: {clickedCookie.info.used_by}</p>
                <p>Expires: {clickedCookie.info.expires_in}</p>
                <p>Purpose: {clickedCookie.info.purpose}</p>
            </div>
           )}
           {gameOver && (
        <div className="game-over-overlay">
                Game Over       
        </div>
        )}
        </div>
        
        );
    }
