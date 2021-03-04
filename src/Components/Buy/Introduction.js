import React, { Component } from "react";
import Anime from 'react-anime';
import './Buy.css';

class Introduction extends Component {
  constructor(props){
    super(props)
    this.state = {
      currStep: 1,
      key: Math.floor(Math.random()*1000001),
      pageCount: 5,
      maxCount: 6
    }
  }

  _next = () => {
      let currStep = this.state.currStep;
      currStep = currStep >= this.state.maxCount? this.state.maxCount: currStep + 1
      this.setState({
        currStep: currStep
      })
  }

  _prev = () => {
      let currStep = this.state.currStep;
      currStep = currStep <= 1? 1: currStep - 1
      this.setState({
        currStep: currStep
      })
  }

  prevButton() {
      let currStep = this.state.currStep;
      if(currStep !== 1){
        return (
          <button className="button button-hover-border is-rounded is-light is-medium has-text-weight-bold" onClick={this._prev}> Go Back </button>
        )
      }
      return null;
  }

  nextButton(){
      var DELAY = 100;
      let currStep = this.state.currStep;
      if(currStep < this.state.pageCount ){
        return(
          <button className="button button-hover-border is-rounded is-family-secondary is-medium has-text-weight-bold" onClick={this._next}>
          <Anime easing="linear" delay={DELAY} loop={true} direction="alternate" opacity={['100%', '20%']}>
            Next
          </Anime>
          </button>
        )
      }
  }

  render() {
    return(
      <>
        <Page1 currStep = {this.state.currStep} />
        <Page2 currStep = {this.state.currStep} />
        <Page3 currStep = {this.state.currStep} />
        <Page4 currStep = {this.state.currStep} />
        <Page5 currStep = {this.state.currStep} />
        <div className="my-5"></div>
        <div>
            {this.prevButton()}
            {this.nextButton()}
        </div> 
      </>
    )
  }
}

function Page1(props){
  if(props.currStep !== 1){ return null; }
  return(
    <>
      <div>
        In this page, you'll learn all the skills you need to steal Dorgon's kitchen! (pls help with the write up)
      </div>
    </>
  )
}

function Page2(props){
  if(props.currStep !== 2){ return null; }
  return(
    <>
      <div>
        (Goal) Introducing HTTP requests. 
        1. HTTP (or HTTPS) is a way for our browser to communicate to the server?
        2. HTTP allows data of a users (that's you and me) to transfer over the internet.
        3. When we open a website, we send a request to the server.
        4. The server will repond to the user's request with different messages.
      </div>
    </>
  )
}

function Page3(props){
  if(props.currStep !== 3){ return null; }
  return(
    <>
      <div>
        (Goal)Introducing cookies.
        1. Cookie is a way for a web browser to store and pass information between pages. 
        2. (some more stuff)
        3. In Gordon's kitchen, he has some secret cookies stored.
        4. Your task later is to find out his cookies, decode his secret messages, and try to steal his kitchen. 
      </div>
    </>
  )
}

function Page4(props){
  if(props.currStep !== 4){ return null; }
  return(
    <>
      <div>
        (Goal)Introducing how to access dev tools.
        1. For chrome users (not sure what the others are like)
        2. Right click (or two finger tap if using touchpad), 
        3. select inspect.
        4. Attach screenshot. 
      </div>
    </>
  )
}

function Page5(props){
  if(props.currStep !== 5){ return null; }
  return(
    <>
      <div>
        (Goal)Introducing how to find secret Ingredient in cookies.
        1. On the top nav bar of the console, select cookies. 
        2. On the leftside, we can see different cookies.
        3. By clicking on a specific cookie, we can view many properties of the cookie. 
        4. Attach screenshot.
        5. Ready to go? Click on "Steal Dorgon's Kitchen" to get started with your quest :) 
      </div>
    </>
  )
}

export default Introduction