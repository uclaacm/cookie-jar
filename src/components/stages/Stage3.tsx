//Falling cookie game
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import "../../styles/Stage3.scss";



export default function Basket() {
    const [basketX, setBasketX] = useState(200);
    const basketWidth = 100;

    //Basket Movement
    useEffect(() => {
        const handleKeyDown = (e:KeyboardEvent) =>{
        if(e.key ==="ArrowLeft"){
            setBasketX((x) => Math.max(0,x-30));
        }
        else if (e.key==="ArrowRight"){
            setBasketX((x) => Math.min(window.innerWidth-basketWidth, x+30))
        }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () =>window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className = "gameArea">
          <div className = "instructions">Press ← → to move</div>
    
          {/* basket (positioned absolutely using inline styles for clarity) */}
          <div className = "basket"
            style={{ left: basketX, width: basketWidth,}}
          />
        </div>
      );
    }
    
