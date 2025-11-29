import React, { useRef, useState }  from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImgRadioButton from "../ImgRadioButton";
import "../../styles/Stage3.scss";
import chocolateChipsImg from "../../assets/chocolate-chips.svg";
import sprinklesImg from "../../assets/sprinkles.svg";
import frostingImg from "../../assets/frosting.svg";
import mmsImg from "../../assets/mms.svg";
import caramelImg from "../../assets/caramel.svg";
import plainCookieImg from  "../../assets/plain-cookie.svg";
import chocolateChipCookieImg from "../../assets/chocolate-chip-cookie.svg";
import sprinklesCookieImg from "../../assets/sprinkles-cookie.svg";

const setCookie = (name: string, value: string | null, durationSeconds?: number) => {
    document.cookie = name + "=" + (value || "") + "; max-age=" + (durationSeconds ?? "") + "; path=/";
}

const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const eraseCookie = (name: string) => {   
    document.cookie = name + "=; path=/";
}

const Stage3: React.FC = () => {
    // All toppings
    const toppings = [
        { name: "plain", img: null, cookieImg: plainCookieImg },
        { name: "chocolate chips", img: chocolateChipsImg, cookieImg: chocolateChipCookieImg },
        { name: "sprinkles", img: sprinklesImg, cookieImg: sprinklesCookieImg },
        { name: "frosting", img: frostingImg, cookieImg: plainCookieImg },
        { name: "m&m's candy", img: mmsImg, cookieImg: plainCookieImg },
        { name: "caramel drizzle", img: caramelImg, cookieImg: plainCookieImg}
    ];

    // Initialize timer state with value in cookie if available
    let minutesRemaining = 5;
    let secondsRemaining = 0;
    let isTimerZero = false;
    if (!((getCookie("timer") == "") || (getCookie("timer") === null))) {
        const now = Date.now();
        const timerStarted = Number(getCookie("timer"));
        const secondsPassed = Math.round((now - timerStarted) / 1000);
        const totalSecondsRemaining = 300 - secondsPassed;
        if (totalSecondsRemaining > 0) {
            minutesRemaining = Math.floor((totalSecondsRemaining) / 60);
            secondsRemaining = (totalSecondsRemaining) - (minutesRemaining * 60);
        } else {
            minutesRemaining = 0;
            secondsRemaining = 0;
            isTimerZero = true;
        }
    }

    // Initialize cookieTopping state with value in cookie if available
    let topping = 0;
    if (!((getCookie("topping") == "") || (getCookie("topping") === null))) {
        topping = Number(getCookie("topping"));
    }

    const [time, setTime] = useState({ minutes: minutesRemaining, seconds: secondsRemaining });
    const timerIntervalId = useRef<number | undefined>(undefined);
    const [cookieTopping, setCookieTopping] = useState(topping);
    const [timerStartFlag, setTimerStartFlag] = useState(false);
    const [timerCompleteFlag, setTimerCompleteFlag] = useState(isTimerZero);

    const runTimer = (isStart: boolean) => {
        if (timerIntervalId.current != undefined) {
            return;
        }

        if (isStart) {
            setCookie("timer", String(Date.now()));
        }

        timerIntervalId.current = setInterval(() => {
            setTime(prevTime => {
                if (prevTime.seconds > 0) {
                    return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
                } else {
                    if (prevTime.minutes == 0) {
                        clearInterval(timerIntervalId.current);
                        timerIntervalId.current = undefined;
                        setTimerStartFlag(false);
                        setTimerCompleteFlag(true);
                        return { minutes: prevTime.minutes, seconds: prevTime.seconds };
                    }

                    return { minutes: prevTime.minutes - 1, seconds: 59 };
                }
            });
        }, 1000);
    }

    const resetTimer = () => {
        clearInterval(timerIntervalId.current);
        timerIntervalId.current = undefined;
        eraseCookie("timer");
        setTime({ minutes: 5, seconds: 0 });
    }

    const selectCookieTopping = () => {
        const cookieToppingBoxes = document.getElementsByName("cookie-topping");
        for (let i = 0; i < cookieToppingBoxes.length; i++) {
            const button = cookieToppingBoxes[i] as HTMLInputElement; 
            if (button.checked) {
                setCookieTopping(Number(button.value));
                break;
            }
        }
    }

    const submitCookieTopping = () => {
        if (cookieTopping == 0) {
            window.alert("Please select a topping.");
            return;
        }

        setCookie("topping", String(cookieTopping), 300);
        runTimer(true);
        setTimerStartFlag(true);
    }

    const resetCookieTopping = () => {
        eraseCookie("timer");
        eraseCookie("topping");
        resetTimer();
        setCookieTopping(0);
        setTimerStartFlag(false);
        setTimerCompleteFlag(false);
    }

    // Automatically start running the timer if in progress
    if (!((getCookie("timer") == "") || (getCookie("timer") === null) || ((time.minutes == 0) && (time.seconds == 0)))) {
        runTimer(false);
    }

    return (
        <div className="stage3-container">

            {timerStartFlag && (
                <div style={{ padding: "0px 200px" }}>
                    <div style={{ textAlign: "center" }}><h1>Time is ticking...</h1></div>
                    <div style={{ padding: "30px 0px" }}><p>The website will remember your choice of <u>{toppings[cookieTopping].name}</u> using a cookie and display custom designs based on that information! This cookie will expire after 5 minutes, and the website will forget your info.</p></div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <Link to="/stage4"><button className="done-button">continue</button></Link>
                        <div className="timer">
                            {time.minutes + ":" + (time.seconds < 10 ? "0" : "") + time.seconds}
                        </div>
                        <div><button className="done-button" onClick={() => resetCookieTopping()}>restart</button></div>
                    </div>
                </div>
            )}

            {timerCompleteFlag && (
                <div>
                    <div style={{ textAlign: "center" }}><h1>Time is up!</h1></div>
                    <div style={{ padding: "30px 100px" }}><p>The cookie containing your info has expired! You can choose another topping to create a new cookie.</p></div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button className="done-button" onClick={() => resetCookieTopping()}>make a new cookie</button>
                    </div>
                </div>
            )}

            {!timerStartFlag && !timerCompleteFlag && (
                <div>
                    <h1>Stage 3</h1>
                    <p>
                        Pick a topping for your cookie! This website will use a cookie to remember your decision.
                    </p>
                    <div style={{ display: "flex" }}>
                        <div className="content-container">
                            <div className="timer">
                                {time.minutes + ":" + (time.seconds < 10 ? "0" : "") + time.seconds}
                            </div>
                            <div>
                                <img id="cookieImg" src={toppings[cookieTopping].cookieImg} alt={toppings[cookieTopping].name + " cookie"} width="500" height="500" />
                            </div>
                        </div>
                        <div className="content-container">
                            <div>
                                {time.minutes == 5 && (
                                    <div className="cookie-toppings-container">
                                        {toppings.map((topping, index) => (
                                            (index != 0 && topping.img != null && (
                                                <ImgRadioButton 
                                                    key={index}
                                                    groupName="cookie-topping"
                                                    label={topping.name}
                                                    value={index}
                                                    img={topping.img}
                                                    onClick={() => selectCookieTopping()}
                                                />
                                            ))

                                        ))}
                                    </div>
                                )}
                                {time.minutes != 5 && (
                                    <div className="cookie-topping-display">
                                        <p>You have selected <u>{toppings[cookieTopping].name}</u> as your topping!</p>
                                    </div>
                                )}
                                

                                <div className="done-button-container">
                                    {timerIntervalId.current == undefined && time.minutes != 0 && (
                                        <button className="done-button" onClick={() => submitCookieTopping()}>done</button>
                                    )}
                                    {timerIntervalId.current == undefined && time.minutes == 0 && (
                                        <button className="done-button" onClick={() => resetTimer()}>make new cookie</button>
                                    )}
                                    {timerIntervalId.current != undefined && (
                                        <button className="done-button" onClick={() => resetCookieTopping()}>reset cookie</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            

            <Link to="/stage2" className="back-button">
                <ArrowLeft />
            </Link>
            <Link to="/stage4" className="next-button">
                <ArrowRight />
            </Link>

        </div>
    );
};

export default Stage3;