import React, { Component } from "react";
import './Buy.css';
import Introduction from './Introduction';
import Activity from './Activity';

class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: true,   // if true display introduction else display activity
    }
  }

  togglePage = (e) => {
    const selected = e.target.value;
    console.log(selected)
    console.log(this.state.introduction)
    if (selected === '1') this.setState({introduction: true})
    if (selected === '2') this.setState({introduction: false})
  }

  render(){
    return ( 
      <>
        <section class="hero  is-fullheight">
        <div class="hero-body">
          <div className="container has-text-centered">
            <div className="chef_hat_container">
              <img src="./chef_hat.svg" alt="chef's hat" className="mt-6 mb-6" style={{width: '650px', height: 'auto'}}></img>
            </div>
            <div  style={{display:'block'}}>
              <div class="columns">
                <div className="column"></div>
                <div className="column">
                  <button className="button is-medium is-family-primary" onClick={this.togglePage} value={1}>Find Secret Ingredient </button>
                </div>
                <div className="column"></div>
                <div className="column">
                  <button className="button is-medium is-family-primary" onClick={this.togglePage} value={2}>Steal Dorgon’s Kitchen </button>
                </div>
                <div className="column"></div>
              </div>
            </div>
            <div className="my-6"></div>
            {this.state.introduction? (
              <Introduction></Introduction>
            ) : (
              <Activity></Activity>
            )
            }
          </div>
        </div>
        </section>
      </>
    )
  }
}

export default Buy;