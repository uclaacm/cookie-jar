import React, { Component } from "react";
import './landing.css'
import Anime from 'react-anime';
import { useHistory } from "react-router-dom"

class Modal extends Component {
  constructor(props) {
      super(props);
      this.state = {
          active: false
      }
  }

  displayModal() {
      this.setState({active: this.state.active^true});
      console.log(this.state.active.toString())
  }

  render() {
      return(
          <div >
              <div className={this.state.active ? "modal is-active" : "modal"}>
                  <div className="modal-background"></div>
                  <div className="modal-content">
                      <div className="box">
                      <div className="risque is-size-3">WARNING: this site will teach you cookies. </div>
                          <div className="risque is-size-3">Do you wish to continue?</div>
                         <button className="button is-medium mt-5" onClick={()=>this.displayModal()} aria-label="close">Yes</button>
                      </div>
                  </div>
              </div>
          </div>
      
    )
  }
}

function Landing() {
  const history = useHistory()
  const cookies = ['/cookie.png','/cookie.png',]

  function start() {
    history.push("/bake")
  }

  return(
    <>
      <section class="hero  is-fullheight">
      <div class="hero-body">
        <div className="container has-text-centered">
          <div className="columns mt-6">
            <div className="column">
              <div className="family1 title mt-6">Cookie Jar</div>
              <div className="family1 is-size-3">What are web cookies?</div>
              <div className="family1 is-size-3">What types of cookies are out there?</div>
              <div className="family1 is-size-3 mb-6">In cookie jar, we'll learn all about web cookies and how they make life easier. Have fun!</div>
              <button className="button is-large" onClick={start}>Start Baking</button>
            </div>
            <div className="column">
              
              <Anime easing="linear"
                loop={true}
                translateY="50vh"
                translateX="0vw"
                duration={2000}
                delay={1000}
                opacity={[0,1]}
              > 
                <img src={ cookies[0] } alt="cookie" className="img_cookie" style={{ position: 'absolute', top: '0vh', left:'50%'}}></img>
              </Anime>
              <Anime easing="linear"
              loop={true}
                translateY="40vh"
                translateX="0vw"
                duration={2000}
                opacity={[0,1]}
                delay={2000}
              > 
                <img src={ cookies[1] } alt="cookie" className="img_cookie" style={{ position: 'absolute', top: '0vh', left:'35%'}}></img>
              </Anime>
              <div className="my-6"> </div>
              <img src="./jar_original.svg" className="img_jar" alt="empty jar"></img>
            </div>
          </div>
          </div>

        <Modal ></Modal>

        </div>
        <div className="container has-text-centered mb-3 mt-2">
          <div className="is-size-5 family1">Made with ❤️ by TeachLA</div>
        </div>
      </section>
    </>
  )
}

export default Landing;