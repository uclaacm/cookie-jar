import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "../../styles/Stage3.scss";

const Stage3: React.FC = () => {
    const [cookieBase, setCookieBase] = useState("");
    const [cookieToppings, setCookieToppings] = useState<string[]>([]);

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
                <div>
                    <p>
                        Select cookie base
                    </p>
                    <label><input type="radio" name="cookie-base" value="Brown Sugar" onClick={() => selectCookieBase()} />Brown Sugar</label><br />
                    <label><input type="radio" name="cookie-base" value="Sugar" onClick={() => selectCookieBase()} />Sugar</label><br />
                    <label><input type="radio" name="cookie-base" value="Shortbread" onClick={() => selectCookieBase()} />Shortbread</label><br />
                    <label><input type="radio" name="cookie-base" value="Peanut Butter" onClick={() => selectCookieBase()} />Peanut Butter</label><br />
                    <label><input type="radio" name="cookie-base" value="Oatmeal" onClick={() => selectCookieBase()} />Oatmeal</label><br />
                    <br />

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
                        </div>
                    )}

                </div>
                <div>
                    <div style={{ width: "300px", height: "300px", border: "1px solid black" }}>
                        <div>{cookieBase}</div>
                        {cookieToppings.map((cookieTopping) => (
                            <div>{cookieTopping}</div>
                        ))}
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