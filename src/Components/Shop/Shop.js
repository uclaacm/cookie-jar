import React, { Component } from "react";

let dummyCookieSVG = "https://www.svgrepo.com/show/30963/cookie.svg"; // replace this, filler for now ~

class CookieModal extends Component {
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
                <button onClick={() => this.displayModal()}>See More</button>
                <div className={this.state.active ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                           <p>Yum</p>
                           <button onClick={()=>this.displayModal()} aria-label="close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        
      )
    }
}

class CookieTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    render() {
        return(
            <div className="tile is-parent">
                <article className="tile is-child box">
                <p className="title">{this.props.title}</p>
                <img src={dummyCookieSVG} alt="cookie" width="200px"></img> 
                <p className="subtitle">{this.props.subtitle}</p>
                <CookieModal ></CookieModal>
                </article>
            </div>
        )
    }
}

class Shop extends Component {
    render(){
        return(
            <div style={{paddingTop: '10%'}} className="container">
                This is the Shop Page
                <div className="tile is-ancestor">
                    <CookieTile title="Session Cookies" subtitle="A customer favorite <3"/>
                    <CookieTile title="Persistent Cookies" subtitle="Some preservatives added"/>
                    <CookieTile title="Third Party Cookies" subtitle="Made with love from our other ~partners~"/>
                </div>
            </div>
        )
    }
}

export default Shop;