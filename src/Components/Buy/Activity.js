import React, { useState } from "react";
import './Buy.css';
import { Stove, Oven, Door } from "./Kitchen.js";
import { useCookies } from "react-cookie";

function Activity() {
  const [val, setVal] = useState("");

  /* 
  state records how many parts solved:
  0 ~ 1 are input questions
  2 is editing cookie value
  3 is success page
  */
  const [stage, setStage] = useState(0); 

  const [cookies, setCookie] = useCookies(["user", "stove", "door", "oven", "fridge"]);
  const [rendered, setRendered] = useState(0);

  const [questions, setQuestions] = useState([[],[],[]]);

  if (!rendered) { // !rendered){
    setRendered(1);
    setCookie("user", "Gordon", { path: '/' });
    setCookie(
      "stove", 
      "HsiSbw3iv0Pzx1iBs4iu8eLLjm3VgOw6Mk4ksBIseMyRamenIsCookingOnTheStoveUkwehuUswoPqKs2", 
      { path: '/' }
    );
    var expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 2);
    if (stage !== 2) {
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
    }
    
    setQuestions([
      ["What's cooking on the stove?", "Ramen"], // read the value of a cookie
      ["How many days should Gordon wait to turn the oven off", "2"], // checking expiration date of a cookie 
      ["Can you change the color of the door from red to green?", "green"], // modifying a cookie
      ["Congrats!", ""]
    ]);
  }

  console.log(cookies["user"]) // remove the cookie unused warning msg
  console.log(cookies["door"])
  console.log(stage)

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
          <Stove></Stove>
          <Oven></Oven>
          <Door color={document.cookie.indexOf("door=green") > 0}></Door>
        </div>

        <div className="is-size-5 field-label is-normal center"> {questions[stage][0]} </div>

        { stage < 3 &&
        <form onSubmit={handleSubmit}>
          <div className="my-2"></div>
          <input 
            type="text" value={val} onChange={e => setVal(e.target.value)} 
            placeholder="Answer"
            className=""
          />
          <br />
          <input type="submit" className="button"/>
        </form>
        }
        {
          stage === 2 && document.cookie.indexOf("door=green") > 0  && setStage(3) // may be better suited as a timeout ?
        }
        { stage === 3 &&
          <div>You're a cookie connoisseur >:)</div>
        }
        
      </div>
    </>
  )
}

export default Activity