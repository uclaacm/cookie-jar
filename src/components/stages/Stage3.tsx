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

const Stage3: React.FC = () => {
    const [time, setTime] = useState({ minutes: 5, seconds: 0 });
    const timerIntervalId = useRef<number | undefined>(undefined);
    const [cookieTopping, setCookieTopping] = useState("plain");

    const toppings = [
        { name: "chocolate chips", img: chocolateChipsImg, cookieImg: chocolateChipCookieImg },
        { name: "sprinkles", img: sprinklesImg, cookieImg: sprinklesCookieImg },
        { name: "frosting", img: frostingImg, cookieImg: plainCookieImg },
        { name: "m&m's candy", img: mmsImg, cookieImg: plainCookieImg },
        { name: "caramel drizzle", img: caramelImg, cookieImg: plainCookieImg}
    ];

    const runTimer = () => {
        if (timerIntervalId.current != undefined) {
            return;
        }

        timerIntervalId.current = setInterval(() => {
            setTime(prevTime => {
                if (prevTime.seconds > 0) {
                    return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
                } else {
                    if (prevTime.minutes == 0) {
                        clearInterval(timerIntervalId.current);
                        timerIntervalId.current = undefined;
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
        setTime({ minutes: 5, seconds: 0 });
    }

    const selectCookieTopping = () => {
        const cookieToppingBoxes = document.getElementsByName("cookie-topping");
        for (let i = 0; i < cookieToppingBoxes.length; i++) {
            const button = cookieToppingBoxes[i] as HTMLInputElement; 
            if (button.checked) {
                const cookieImg = document.getElementById("cookieImg") as HTMLImageElement;
                for (let j = 0; j < toppings.length; j++) {
                    if (toppings[j].name == button.value) {
                        cookieImg.src = toppings[j].cookieImg;
                        break;
                    }
                }
                cookieImg.alt = button.value;
                setCookieTopping(button.value);
            }
        }
    }

    return (
        <div className="stage3-container">
            <h1>Stage 3</h1>
            <p>
                Websites use a tool called <u>cookies</u> to remember information about you across multiple visits.<br />Pick a topping for your cookie! This website will use a <u>cookie</u> to remember your decision.
            </p>
            <div style={{ display: "flex" }}>
                <div className="content-container">
                    <div className="timer">
                        {time.minutes + ":" + (time.seconds < 10 ? "0" : "") + time.seconds}
                    </div>
                    <div>
                        <img id="cookieImg" src={plainCookieImg} alt="Plain Cookie" width="500" height="500" />
                    </div>
                </div>
                <div className="content-container">
                    <div>
                        <div className="cookie-toppings-container">
                            {toppings.map((topping, index) => (
                                <ImgRadioButton 
                                    key={index}
                                    groupName="cookie-topping"
                                    value={topping.name}
                                    img={topping.img}
                                    onClick={() => selectCookieTopping()}
                                />
                            ))}
                        </div>

                        <div className="done-button-container">
                            {timerIntervalId.current == undefined && time.minutes != 0 && (
                                <button className="done-button" onClick={() => runTimer()}>done</button>
                            )}
                            {timerIntervalId.current == undefined && time.minutes == 0 && (
                                <button className="done-button" onClick={() => resetTimer()}>make new cookie</button>
                            )}
                            {timerIntervalId.current != undefined && (
                                <button className="done-button" onClick={() => resetTimer()}>reset cookie</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            

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