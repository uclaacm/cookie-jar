import React, { useRef, useState }  from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardRadioButton from "../CardRadioButton";
import "../../styles/Stage3.scss";

const Stage3: React.FC = () => {
    const [time, setTime] = useState({ minutes: 5, seconds: 0 });
    const timerIntervalId = useRef<number | undefined>(undefined);
    const [cookieBase, setCookieBase] = useState("");
    const [cookieToppings, setCookieToppings] = useState<string[]>([]);

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

    const selectCookieBase = () => {
        const cookieBaseButtons = document.getElementsByName("cookie-base");
        for (let i = 0; i < cookieBaseButtons.length; i++) {
            const button = cookieBaseButtons[i] as HTMLInputElement; 
            if (button.checked) {
                setCookieBase(button.value);
                break;
            }
        }
    }

    const selectCookieTopping = () => {
        const cookieToppingBoxes = document.getElementsByName("cookie-topping");
        let toppingsSelected = [];
        for (let i = 0; i < cookieToppingBoxes.length; i++) {
            const button = cookieToppingBoxes[i] as HTMLInputElement; 
            if (button.checked) {
                toppingsSelected.push(button.value);
            }
        }
        setCookieToppings([...toppingsSelected]);
    }

    return (
        <div className="stage3-container">
            <h1>Stage 3</h1>

            <div style={{ display: "flex" }}>
                <div className="content-container">
                    <div style={{ width: "150px", height: "50px", border: "1px solid black", marginBottom: "20px" }}>
                        {time.minutes + ":" + (time.seconds < 10 ? "0" : "") + time.seconds}
                    </div>
                    <div style={{ width: "300px", height: "300px", border: "1px solid black" }}>
                        <div>{cookieBase}</div>
                        {cookieToppings.map((cookieTopping, index) => (
                            <div key={index}>{cookieTopping}</div>
                        ))}
                    </div>
                </div>
                <div className="content-container">
                    <p>
                        Select cookie base
                    </p>
                    <CardRadioButton 
                        groupName="cookie-base"
                        value="Brown Sugar"
                        gap="20px"
                        onClick={() => selectCookieBase()}
                    />
                    <CardRadioButton 
                        groupName="cookie-base"
                        value="Sugar"
                        gap="20px"
                        onClick={() => selectCookieBase()}
                    />
                    <CardRadioButton 
                        groupName="cookie-base"
                        value="Shortbread"
                        gap="20px"
                        onClick={() => selectCookieBase()}
                    />
                    <CardRadioButton 
                        groupName="cookie-base"
                        value="Peanut Butter"
                        gap="20px"
                        onClick={() => selectCookieBase()}
                    />
                    <CardRadioButton 
                        groupName="cookie-base"
                        value="Oatmeal"
                        gap="20px"
                        onClick={() => selectCookieBase()}
                    />

                    {cookieBase != "" && (
                        <div>
                            <p>
                                Select cookie toppings
                            </p>
                            <label><input type="checkbox" name="cookie-topping" value="Sprinkles" onClick={() => selectCookieTopping()} />Sprinkles</label><br />
                            <label><input type="checkbox" name="cookie-topping" value="Frosting" onClick={() => selectCookieTopping()} />Frosting</label><br />
                            <label><input type="checkbox" name="cookie-topping" value="Chocolate Chips" onClick={() => selectCookieTopping()} />Chocolate Chips</label><br />
                            <label><input type="checkbox" name="cookie-topping" value="Nuts" onClick={() => selectCookieTopping()} />Nuts</label><br />
                            <label><input type="checkbox" name="cookie-topping" value="Candy" onClick={() => selectCookieTopping()} />Candy</label><br />
                            {timerIntervalId.current == undefined && time.minutes != 0 && (
                                <button onClick={() => runTimer()}>Done</button>
                            )}
                            {timerIntervalId.current == undefined && time.minutes == 0 && (
                                <button onClick={() => resetTimer()}>Make New Cookie</button>
                            )}
                            {timerIntervalId.current != undefined && (
                                <button onClick={() => resetTimer()}>Reset Cookie</button>
                            )}
                            
                        </div>
                    )}
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