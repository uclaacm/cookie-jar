import React from "react";
import './Buy.css';
import { Stove, Oven, Door } from "./Kitchen.js";

function Activity() {
  return(
    <>
      <div>
        Welcome to your SmartKitchen, Dorgon.
        <div style={{display:"flex",alignItems:"center"}}>
          <Stove></Stove>
          <Oven></Oven>
          <Door></Door>
        </div>
      </div>
    </>
  )
}

export default Activity