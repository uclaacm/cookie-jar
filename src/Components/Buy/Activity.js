import React, { useState } from "react";
import './Buy.css';
import { Stove, Oven, Door, StoveSuccess, OvenSuccess, DoorSuccess } from "./Kitchen.js";
import { useCookies } from "react-cookie";

function Activity() {
  const [val, setVal] = useState("");

  /* 
  state records how many parts solved:
  0 ~ 1 are input questions
  2 is editing cookie value
  3 is success page, not constructed yet
  */
  const [stage, setStage] = useState(0); 

  const [cookies, setCookie] = useCookies(["user", "stove", "door", "oven", "fridge"]);
  const [rendered, setRendered] = useState(0);

  const [questions, setQuestions] = useState([[],[],[]]);

  if (!rendered){
    setRendered(1);
    setCookie("user", "Gordon", { path: '/' });
    setCookie(
      "stove", 
      "HsiSbw3iv0Pzx1iBs4iu8eLLjm3VgOw6Mk4ksBIseMyRamenIsCookingOnTheStoveUkwehuUswoPqKs2", 
      { path: '/' }
    );
    var expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 2);
    setCookie(
      "oven", 
      "MFoiLCJJb3RkIjowLCJEZnQiOm51bGwsIk12cyI6MCwiRmx0IjowLCJJbXAiOjEzOTB9PC=U316&R=200&RB=0&GB=0&RG=200", 
      { path: '/', expires: expiration_date}
    );
    setCookie(
      "door", 
      "de5746cc22b8107ace4a715ed1dde69871616469224", 
      { path: '/'}
    );
    setQuestions([
      ["What's cooking on the stove?", "Ramen"], // read the value of a cookie
      ["How many days should Gordon wait to turn the oven off", "2"], // checking expiration date of a cookie 
      ["Can you change the color of the door from red to green?", "green"] // modifying a cookie
    ]);
  }

  console.log(cookies["user"]) // remove the cookie unused warning msg
  console.log(cookies["door"])

  const handleSubmit = e => {
    e.preventDefault();
    if (stage < 2){
      if (val.toLowerCase() === questions[stage][1].toLowerCase()) {
        if (stage < 3) setStage(stage+1);
      }
    }
  };

  return(
    <>
      <div>
        <div className="is-size-3 has-text-weight-semibold my-4"> Welcome to your SmartKitchen, Dorgon. </div>

        <div style={{display:"flex",alignItems:"center"}}>
          {stage > 0? (
            <StoveSuccess></StoveSuccess>
          ) : (
            <Stove></Stove>
          )}
          {stage > 1? (
            <OvenSuccess></OvenSuccess>
          ) : (
            <Oven></Oven>
          )}
          {stage > 2? (
            <DoorSuccess></DoorSuccess>
          ) : (
            <Door></Door>
          )}
        </div>

        <div className="is-size-5 field-label is-normal center"> {questions[stage][0]} </div>

        { stage < 2 &&
        <form onSubmit={handleSubmit}>
          <div className="my-2"></div>
          <input 
            type="text" value={val} onChange={e => setVal(e.target.value)} 
            placeholder="Answer"
            className="input"
            style={{width: '20%'}}
          />
          <br />
          <div className="my-3"></div>
          <input type="submit" className="button"/>
        </form>
        }
        { stage === 3 &&
          <div>congrats!</div>
        }
        
      </div>
    </>
  )
}

export default Activity