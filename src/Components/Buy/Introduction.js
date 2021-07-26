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
      <div className="is-size-5">
        <Anime easing="linear" delay={1000} loop={false} opacity={['10%', '100%']}>
        In this page, you'll learn all the skills you need to steal Dorgon's kitchen!
        </Anime>
      </div>
    </>
  )
}

function Page2(props){
  if(props.currStep !== 2){ return null; }
  return(
    <>
      <div className="is-size-5">
        <Anime easing="linear" delay={1000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">HTTP (and HTTPS) is a way for our browser to communicate to the server.</div>
        </Anime>
        <Anime easing="linear" delay={3000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">HTTP allows data of a users (that's you and me) to transfer over the internet.</div>
        </Anime>
        <Anime easing="linear" delay={5000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">When we open a website, we send a request to the server.</div>
        </Anime>
        <Anime easing="linear" delay={7000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">The server will repond to the user's request with different messages.</div>
        </Anime>
      </div>
    </>
  )
}

function Page3(props){
  if(props.currStep !== 3){ return null; }
  return(
    <>
      <div className="is-size-5">
        <Anime easing="linear" delay={1000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Cookie is a way for a web browser to store and pass information between pages. </div>
        </Anime>
        <Anime easing="linear" delay={3000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">They are mainly used to manage user sessions, store user personalization preferences, and track user behavior.</div>
        </Anime>
        <Anime easing="linear" delay={5000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">In Gordon's kitchen, he has some secret cookies stored.</div>
        </Anime>
        <Anime easing="linear" delay={7000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Your task later is to find out his cookies, decode his secret messages, and try to steal his kitchen. </div>
        </Anime>
        <Anime easing="linear" delay={9000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Before we get started, first let's learn how to access cookies. </div>
        </Anime>
      </div>
    </>
  )
}

function Page4(props){
  if(props.currStep !== 4){ return null; }
  return(
    <>
      <div>
        <Anime easing="linear" delay={0} loop={false} opacity={['0%', '100%']}>
          <div className="my-4 is-centered">
          <table className="table center">
            <thead>
              <tr>
                <th>Browser</th>
                <th>Steps</th>
                <th>Screenshot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <div>Chrome</div>
                  <div>& Edge</div>
                </th>
                <td>
                  <div>1. Right click (or two finger tap if using touchpad), and then select Inspect.</div>
                  <div>2. In the inspector, select Application. </div>
                  <div>3. On the leftside, expand cookies. </div>
                </td>
                <td>
                  <ImageModal choice={1}></ImageModal>
                </td>
              </tr>
              <tr>
                <th>Firefox</th>
                <td>
                  <div>1. Right click (or two finger tap if using touchpad), and then select Insepect Element</div>
                  <div>2. In the inspector, select Storage. </div>
                  <div>3. On the leftside, expand cookies. </div>
                </td>
                <td>
                  <ImageModal choice={2}></ImageModal>
                </td>
              </tr>
              <tr>
                <th>Safari</th>
                <td>
                  <div>1. In the menu bar on the top left of the screen. Select "Safari", then "Preferences"</div>
                  <div>2. Click Advanced, then select “Show Develop menu in menu bar</div>
                  <div>3. Click on top menu bar, select "Develop", then "Show Web Inspector"</div>
                  <div>4. In the inspector, select Storage. </div>
                  <div>5. On the leftside, expand cookies. </div>
                </td>
                <td>
                <ImageModal choice={3}></ImageModal>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </Anime>
      </div>
    </>
  )
}

function Page5(props){
  if(props.currStep !== 5){ return null; }
  return(
    <>
      <div className="is-size-5">
        <Anime easing="linear" delay={1000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Now we have learned how to view cookies on webpages. </div>
        </Anime>
        <Anime easing="linear" delay={3000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">We know that by clicking on a specific cookie, we can view many properties of the cookie.</div>
        </Anime>
        <Anime easing="linear" delay={5000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Our wonderful chef Gordon's hid some secret ingredients in his kitchen.</div>
        </Anime>
        <Anime easing="linear" delay={7000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">By uncovering the secret ingredients, you will be able to steal his kitchen OvO </div>
        </Anime>
        <Anime easing="linear" delay={9000} loop={false} opacity={['0%', '100%']}>
          <div className="my-4">Ready to go? Click on "Steal Dorgon's Kitchen" to get started with your quest :) </div>
        </Anime>
      </div>
    </>
  )
}


class ImageModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        active: false,
      }
  }

  displayModal() {
    this.setState({active: this.state.active^true});
  }

  render() {
      return(
          <div >
              <button onClick={() => this.displayModal()}>View</button>
              <div className={this.state.active ? "modal is-active" : "modal"}>
                  <div className="modal-background"></div>
                  <div className="modal-content">
                      <div className="box"> 
                        <p className="image">
                         { this.props.choice === 1 && <img src={"./chrome-edge.png"} alt={"chrome & edge screenshot"}/> }
                         { this.props.choice === 2 && <img src={"./firefox.png"} alt={"firefox screenshot"} /> }
                         { this.props.choice === 3 && <img src={"./safari.png"} alt={"safari screenshot"} /> }
                        </p>
                        <button onClick={()=>this.displayModal()} aria-label="close">Close</button>
                      </div>
                  </div>
              </div>
          </div>
    )
  }
}


export default Introduction