import React, { Component } from "react";
import './shop.css'

//let dummyCookieSVG = "https://www.svgrepo.com/show/30963/cookie.svg"; // replace this, filler for now ~

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
                <button className="is-family-primary" onClick={() => this.displayModal()}>See More</button>
                <button className="is-family-primary">Add to Cart</button>
                <div className={this.state.active ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="box">
                           <p className="is-family-primary is-size-3">{this.props.modalContent}</p>
                           <button className="is-family-primary is-size-3" onClick={()=>this.displayModal()} aria-label="close">Close</button>
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
                <p className="is-family-primary modalTitles">{this.props.title}</p>
                <img src={this.props.cookieImage} alt={this.props.title} width="200px"></img> 
                <p className="is-family-primary is-size-3">{this.props.subtitle}</p>
                <CookieModal modalContent={this.props.modalContent}></CookieModal>
                </article>
            </div>
        )
    }
}

const modalData = {
    session: 'This cookie helps websites remember you are logged into your account, so that every time you go to a new page you don’t have to log back in again. They only last as long as your browser is open, so if you close all your windows they will be cleared.',
    firstParty: 'These cookies come from the website you’re on.',
    persistent: 'These cookies are filled with extra preservatives to make them last longer. They still come with an expiration date which tells your browser when they should be deleted, but they can last for days weeks or months.  These help websites remember your settings or preferences.',
    thirdParty: 'Think of these as ~imported~ cookies. They can come from a Facebook like or Add tp Pinterest icon on a site. They don’t come from the website you’re on, but from an outside site that has partnered with them.'
}

const allCookieImages = {
    sessionImage: 'images/sessionCookies.jpg',
    firstPartyImage: 'images/firstPartyCookies.jpg',
    persistentImage: 'images/persistentCookies.jpg',
    thirdPartyImage: 'images/thirdPartyCookies.jpg'
}


class Shop extends Component {
    render(){
        return(
            <div style={{paddingTop: '10%'}} className="container">
            <div className="is-family-primary title mt-6 title">
                Our Bakery Items
            </div>
            <div className="viewCart">
                <button className="is-family-primary is-size-3">View My Cart</button>
            </div>
                <div className="tile is-ancestor">
                    <div>
                        <CookieTile title="Session Cookies" subtitle="A customer favorite <3" modalContent={modalData.session} cookieImage ={allCookieImages.sessionImage}/>
                        <CookieTile title="First Party Cookies" subtitle="Made with love from us" modalContent={modalData.firstParty} cookieImage ={allCookieImages.firstPartyImage}/>
                    </div>
                    <div>
                        <CookieTile title="Persistent Cookies" subtitle="Some preservatives added" modalContent={modalData.persistent} cookieImage ={allCookieImages.persistentImage}/>
                        <CookieTile title="Third Party Cookies" subtitle="Made with love from our other ~partners~" modalContent={modalData.thirdParty} cookieImage ={allCookieImages.thirdPartyImage}/>
                    </div>
                </div>   
            </div>
        )
    }
}

export default Shop;