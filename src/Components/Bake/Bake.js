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

class LuluModal extends Component {
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
              <button onClick={() => this.displayModal()}>This is a test :)</button>
              <div className={this.state.active ? "modal is-active" : "modal"}>
                  <div className="modal-background"></div>
                  <div className="modal-content">
                      <div className="box">
                         <p>Lulu test modal</p>
                         <button onClick={()=>this.displayModal()} aria-label="close">Close</button>
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
        <LuluModal></LuluModal>
      </div>
    );
  }
}

export default Bake;
