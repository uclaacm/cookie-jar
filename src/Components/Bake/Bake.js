import React, { Component } from "react";

class AcceptModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
          active: true
      }
  }


  render() {
      return(
          <div >
              <div className={this.state.active ? "modal is-active" : "modal"}>
                  <div className="modal-background"></div>
                  <div className="modal-content">
                      <div className="box">
                         <p>Warning: This site uses (and teaches!) cookies. Do you wish to continue?</p>
                         <button onClick={this.props.handleClose} aria-label="close">Accept</button>
                      </div>
                  </div>
              </div>
          </div>
      
    )
  }
}

class Bake extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showModal: true
    }
}


  render() {
    return (
      <div style={{ paddingTop: "10%", paddingLeft: "40%" }}>
        This is the Bake Page
        {this.props.showBakeModal && <AcceptModal handleClose={this.props.closeBakeModal}/>}
        <p className="subtitle">{this.props.subtitle}</p>
       
      </div>
    );
  }
}

export default Bake;
