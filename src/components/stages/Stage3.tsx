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

const Stage3: React.FC = () => {
    const [time, setTime] = useState({ minutes: 5, seconds: 0 });
    const timerIntervalId = useRef<number | undefined>(undefined);
    const [cookieTopping, setCookieTopping] = useState<string>("");

    const toppings = [
        "chocolate chips",
        "sprinkles",
        "frosting",
        "m&m's candy",
        "caramel drizzle"
    ]

    const toppingImages = [
        chocolateChipsImg,
        sprinklesImg,
        frostingImg,
        mmsImg,
        caramelImg
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
                setCookieTopping(button.value);
            }
        }
    }

    return (
        <div className="stage3-container">
            <h1>Stage 3</h1>

            <div style={{ display: "flex" }}>
                <div className="content-container">
                    <div style={{ width: "150px", height: "50px", border: "1px solid black", marginBottom: "20px" }}>
                        {time.minutes + ":" + (time.seconds < 10 ? "0" : "") + time.seconds}
                    </div>
                    <div style={{ width: "500px", height: "500px", border: "1px solid black" }}>
                        <div>{cookieTopping}</div>
                    </div>
                </div>
                <div className="content-container">
                    <div>
                        <p>
                            Select cookie toppings
                        </p>

                        <div className="cookie-toppings-container">
                            {toppings.map((topping, index) => (
                                <ImgRadioButton 
                                    key={index}
                                    groupName="cookie-topping"
                                    value={topping}
                                    img={toppingImages[index]}
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