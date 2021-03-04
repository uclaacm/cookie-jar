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
        In this page, you'll learn all the skills you need to steal Dorgon's kitchen
      </div>
    </>
  )
}

function Page2(props){
  if(props.currStep !== 2){ return null; }
  return(
    <>
      <div>
        Introducing HTTP requests
      </div>
    </>
  )
}

function Page3(props){
  if(props.currStep !== 3){ return null; }
  return(
    <>
      <div>
        Introducing cookies
      </div>
    </>
  )
}

function Page4(props){
  if(props.currStep !== 4){ return null; }
  return(
    <>
      <div>
        Introducing how to access dev tools 
      </div>
    </>
  )
}

function Page5(props){
  if(props.currStep !== 5){ return null; }
  return(
    <>
      <div>
        Introducing how to find secret Ingredient in cookies 
      </div>
    </>
  )
}

export default Introduction