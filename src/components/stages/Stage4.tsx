//Falling cookie game
import React from "react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "../../styles/Stage4.scss";


interface CookieInfo {
    _id?: string;
    name: string;
    from: string;
    used_by: string;
    purpose: string;
    expires_in: string;
    type: "first" | "third";
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
        info: CookieInfo;
        clicked: boolean;
    }
}

interface BasketProps {
    basketX: number;
    basketWidth: number;
    setBasketX: React.Dispatch<React.SetStateAction<number>>;
    controls: {
        left: string;
        right: string;
    };
    gameWidth: number;
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

function Basket({ basketX, basketWidth, setBasketX, controls, gameWidth, typeBasket }: BasketProps) {

    //Basket Movement
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === controls.left) {
                setBasketX((x) => Math.max(0, x - 60));
            }
            else if (e.key === controls.right) {
                setBasketX((x) => Math.min(gameWidth - basketWidth, x + 60))
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="basket-container">
            <div className={`basket ${typeBasket === "basket1" ? "basket1" : "basket3"}`}
                style={{ left: basketX, width: basketWidth, }}>
                <p className="basket-label"> {typeBasket === "basket1" ? "Your Basket" : "Everyone's Basket"}</p>
            </div>
        </div>
    );
}


export default function Stage3() {
    const [cookies, setCookies] = useState<CookieProps["data"][]>([]);
    const [gameState, setGameState] = useState<"instructions" | "playing" | "gameover" | "gamewon">("instructions")
    const [isPaused, setIsPaused] = useState(false);
    const [clickedCookie, setClickedCookie] = useState<CookieProps["data"] | null>(null);
    const Frames_per_spawn = 250;
    const frames_elapsed = useRef(250);
    const lastCookieX = useRef<number | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const [gameWidth, setGameWidth] = useState(0);
    const [gameHeight, setGameHeight] = useState(0);
    const [_score, setScore] = useState(0);
    const [basket1X, setBasket1X] = useState(100);
    const [basket3X, setBasket3X] = useState(300);
    const [noCookiesLeft, setNoCookiesLeft] = useState(false);
    const usedCookieIds = useRef<Set<string>>(new Set());
    const basket1XRef = useRef(basket1X);
    const basket3XRef = useRef(basket3X);
    const basketWidth = 250;
    const basketHeight = 100;
    const cookieWidth = 30;
    const cookieHeight = 30;
    let OffScreen = false;
    const [ready, setReady] = useState(false);
    const spawnLockRef = useRef(false);
    const gameSpeed = useRef(1); 

    function resetGame() {
        setScore(0);
        setCookies([]);
        usedCookieIds.current.clear();
        frames_elapsed.current = Frames_per_spawn;
        setClickedCookie(null);
        setIsPaused(false);
        setGameState("playing"); // restarts loop
        setNoCookiesLeft(false);
        spawnLockRef.current = false;
        gameSpeed.current = 1;
    }

    useLayoutEffect(() => {
        if (gameState !== "playing") return;
        if (gameAreaRef.current) {
            const rect = gameAreaRef.current.getBoundingClientRect();
            const style = window.getComputedStyle(gameAreaRef.current);
            const borderLeft = parseFloat(style.borderLeftWidth);
            const borderRight = parseFloat(style.borderRightWidth);
            const borderTop = parseFloat(style.borderTopWidth);
            const borderBottom = parseFloat(style.borderBottomWidth);

            const playableWidth = rect.width - borderLeft - borderRight;
            const playableHeight = rect.height - borderTop - borderBottom;

            setGameWidth(playableWidth);
            setGameHeight(playableHeight);
            console.log(rect.width);
            console.log(rect.height)
            setReady(true);
        }
    }, [gameState]);

    function handleCookieClick(cookie: CookieProps["data"]) {
        if (cookie.clicked) return;
        setIsPaused(true);
        setClickedCookie(cookie);
        setTimeout(() => {
            setIsPaused(false);
            setClickedCookie(null);
            cookie.clicked = true;
        }, 3000);
    }

    function generateValidX (gameWidth: number, cookieWidth: number, basketWidth: number){
        let x;
        do{
            x=Math.random() * (gameWidth - cookieWidth * 2) + cookieWidth;
        } while(lastCookieX.current !== null &&
            Math.abs(x - lastCookieX.current) < basketWidth);
        lastCookieX.current = x;
        return x;
    }

    //function to handle spawning cookies
    async function spawnCookie(gameWidth: number) {
        if (spawnLockRef.current) return;
        spawnLockRef.current = true;

        const target = Math.random() < 0.5 ? "basket1" : "basket3";
        let cookieType = target === "basket1" ? "first" : "third";

        const exclude = Array.from(usedCookieIds.current).join(",");
        let res = await fetch(`/api/cookiesInfo/random?type=${cookieType}&exclude=${exclude}`,
            { cache: "no-store" });
        let data = await res.json();
        if (!res.ok || !data._id) {

            // Try again with the other type
            cookieType = (cookieType === "first") ? "third" : "first";
            res = await fetch(`/api/cookiesInfo/random?type=${cookieType}&exclude=${exclude}`, {
                cache: "no-store"
            });
            data = await res.json();

            if (!res.ok || !data._id) {
                setNoCookiesLeft(true);
                return;
            }
        }

        if (noCookiesLeft) {
            return;
        }

        const x = generateValidX(gameWidth, cookieWidth, basketWidth);

        usedCookieIds.current.add(data._id);

        const newCookie: CookieProps["data"] = {
            id: Date.now(),
            x,
            y: -40,
            speed: gameSpeed.current,
            width: cookieWidth,
            height: cookieHeight,
            type: cookieType,
            mongo_id: data._id,
            info: data,
            clicked: false,
        };
        setCookies(prev => [...prev, newCookie]);
        gameSpeed.current *= 1.035;
        spawnLockRef.current = false;
    }

    //references for basket locations
    useEffect(() => {
        basket1XRef.current = basket1X;
    }, [basket1X]);

    useEffect(() => {
        basket3XRef.current = basket3X;
    }, [basket3X]);

    useEffect(() => {
        if (noCookiesLeft && cookies.length === 0 && gameState === "playing") {
            setGameState("gamewon");
        }
    }, [noCookiesLeft, cookies, gameState]);


    const gameStateRef = useRef(gameState);
    //main game loop
    useEffect(() => {
        gameStateRef.current = gameState;

        if (gameStateRef.current != "playing") return;
        if (!ready) return;

        const interval = setInterval(() => {
            if (gameStateRef.current == "gameover" || gameStateRef.current == "gamewon") {
                usedCookieIds.current.clear();
                return;
            }

            if (isPaused) {
                return;
            }

            frames_elapsed.current += 1;

            let should_spawn = false;
            if (frames_elapsed.current >= Frames_per_spawn) {
                should_spawn = true;
                frames_elapsed.current = 0;
            }

            setCookies((oldCookies) => {
                let newScore = 0;
                const basketY = gameHeight - basketHeight - 16;
                let updatedCookies = oldCookies.map(cookie => ({ ...cookie, y: cookie.y + cookie.speed }))
                    .filter(cookie => {
                        if (cookie.y >= gameHeight) OffScreen = true;
                        let basket1XPos = basket1XRef.current;
                        let basket3XPos = basket3XRef.current;

                        const collidedWithBasket1 = checkCollision(cookie, basket1XPos, basketY, basketWidth, basketHeight);
                        const collidedWithBasket3 = checkCollision(cookie, basket3XPos, basketY, basketWidth, basketHeight);

                        if (collidedWithBasket1 && collidedWithBasket3) {
                            setGameState("gameover");
                            return false;
                        }
                        
                        if (collidedWithBasket1 || collidedWithBasket3) {
                            if ((cookie.type === "first" && collidedWithBasket1) || (cookie.type === "third" && collidedWithBasket3)) {
                                newScore += 1;
                            }
                            else {
                                setGameState("gameover")
                            }
                            return false;
                        }
                        return true;
                    });

                if (newScore > 0) setScore(prev => prev + newScore);
                if (OffScreen) setGameState("gameover");


                if (should_spawn && !noCookiesLeft) {
                    spawnCookie(gameWidth); //fix this later cuz like why are we sorting cookies and then spawning them we have a useless variable here
                }
                return updatedCookies;
            });
        }, 16);
        return () => clearInterval(interval);
    }, [ready, isPaused, gameState]);

    if (gameState == "instructions") {
        return (
            <div className="instructionScreen">
                <h2>How to Play</h2>
                <p>Click on the falling cookie to see it's info. Decide whether it's a first party or third party cookie.</p>
                <p>If it's a first party cookie, sort it into the Player's Jar. If it's a third party cookie, sort it into Everyone's Jar.</p>
                <p>Use the A and D keys to move the player's Jar left and right, and the left and right arrow keys to move everyone's Jar left and right.</p>
                <p>Good Luck!</p>
                <button className="start-button" onClick={() => setGameState("playing")}>
                    Start Playing!
                </button>
            </div>
        );
    }
    return (
        <div className="game-Container">
            <div className="gameArea" ref={gameAreaRef}>
                {ready && (
                    <>
                        {/* <div className = "score">Score: {score}</div> */}
                        {/* <button className = "pause-button" onClick = {() => setIsPaused(prev => !prev)}>
            {isPaused ? "Resume": "Pause"}
        </button>*/}
                        <Basket basketX={basket1X} basketWidth={basketWidth} setBasketX={setBasket1X} controls={{ left: "a", right: "d" }} gameWidth={gameWidth} typeBasket="basket1" />
                        <Basket basketX={basket3X} basketWidth={basketWidth} setBasketX={setBasket3X} controls={{ left: "ArrowLeft", right: "ArrowRight" }} gameWidth={gameWidth} typeBasket="basket3" />

                        {cookies.map(cookie => (
                            <div
                                key={cookie.id}
                                className={`cookie ${cookie.type === "first" ? "cookie-1" : "cookie-3"}`}
                                style={{
                                    top: cookie.y,
                                    left: cookie.x,
                                }} onClick={() => handleCookieClick(cookie)} />
                        ))}
                        {clickedCookie && (
                            <div className="cookie-overlay">
                                <h3>🍪 Cookie Info Card</h3>
                                <p>Name: {clickedCookie.info.name}</p>
                                <p>From: {clickedCookie.info.from}</p>
                                <p>Used By: {clickedCookie.info.used_by}</p>
                                <p>Expires: {clickedCookie.info.expires_in}</p>
                                <p>Purpose: {clickedCookie.info.purpose}</p>
                            </div>
                        )}
                        {(gameState == "gamewon" || gameState == "gameover") && (
                            <div className="game-over-overlay">
                                <h2>{gameState == "gamewon" ? "You won" : "Game Over"} </h2>
                                <button className="restart-button" onClick={resetGame}>
                                    Play Again
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
