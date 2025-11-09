import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CardRadioButton from "../CardRadioButton";
import "../../styles/Stage3.scss";

const Stage3: React.FC = () => {
    const [time, setTime] = useState({ minutes: 5, seconds: "00" });
    const [cookieBase, setCookieBase] = useState("");
    const [cookieToppings, setCookieToppings] = useState<string[]>([]);

    const runTimer = () => {
        const intervalId = setInterval(() => {
            setTime(prevTime => {
                let newTime = { minutes: prevTime.minutes, seconds: prevTime.seconds }

                if (parseInt(prevTime.seconds) > 0) {
                    const newSeconds = parseInt(prevTime.seconds) - 1;
                    if (newSeconds < 10) {
                        newTime.seconds = "0" + newSeconds;
                    } else {
                        newTime.seconds = "" + newSeconds;
                    }
                    return newTime;
                } else {
                    if (prevTime.minutes == 0) {
                        clearInterval(intervalId);
                        return newTime;
                    }

                    newTime.minutes = prevTime.minutes - 1;
                    newTime.seconds = "59";
                    return newTime;
                }
            });
        }, 1000);
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
                        {time.minutes + ":" + time.seconds}
                    </div>
                    <div style={{ width: "300px", height: "300px", border: "1px solid black" }}>
                        <div>{cookieBase}</div>
                        {cookieToppings.map((cookieTopping) => (
                            <div>{cookieTopping}</div>
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
                            <button onClick={() => runTimer()}>Done</button>
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