import React, { Component } from "react";
import HTMLFlipBook from "react-pageflip";
import './bake.scss';
import computer from './images/computer.svg';
import server from './images/server.svg';
import arrow from './images/arrow.png';
import mixer from './images/mixer.svg';
import cookiebyte from './images/cookie-byte.svg';

const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className="page page-cover" ref={ref} data-density="hard">
        <div className="page-content">
          <h2>{props.children}</h2>
        </div>
      </div>
    );
});

const Page = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
        <div className="page-content">
            <h2 className="page-header">{props.header}</h2>
            <div className="page-text">{props.children}</div>
            <div className="page-footer">{props.number + 1}</div>
        </div>
        </div>
    );
});

function Chapter1Images() {
    return(
        <div>
            <img src={computer} alt="computer" height="100" width="100"></img>
            <img src={arrow} alt="arrow pointing from left to right" height="50" width="50"></img>
            <img src={server} alt="server" height="100" width="100"></img>
        </div>
    );
}

function Chapter1Text() {
    return(
        <div>
            <p>The internet is like a super fast delivery system where</p>
            <p>your browser is the buyer and the web server is the</p>
            <p>bakery you are requesting a cake (or webpage) from!</p>
            <br></br>
            <p>Really when you visit a website, it’s like</p>
            <p>you’re ordering it from a Chinese takeout place,</p>
            <p>and they give you fortune cookies even though you</p>
            <p>don’t ask for it. Web cookies, however, are even more</p>
            <p>magical than fortune cookies, and you will receive</p>
            <p>with almost every webpage you “order” from the internet.</p>
            <p>So cookies aren’t necessarily part of a website, but</p>
            <p>they’re helpful addons.</p>
            <br></br>
            <p>Let’s look into how a cookie is made.</p>
        </div>
    )
}

function Chapter2Images() {
    return(
        <div>
            <img src={mixer} alt="mixer" height="200" width="200"></img>
        </div>
    )
}

function Chapter2Text() {
    return(
        <div>
            <p>What actually makes up a cookies?</p>
            <br></br>
            <p>Cookie: mylabel=myvalue123</p>
            <br></br>
            <p>The ingredients to a cookie are simple.</p>
            <br></br>
            <p>1. name - you need to label your cookie</p>
            <p>2. value - this contains the good stuff, that identifies</p>
            <p>your unique cookie</p>
            <br></br>
            <p>Optional:</p>
            <p>A dash of expiry date</p>
            <p>A sprinkle of path</p>
            <p>A smidge of domain</p>
        </div>
    )
}

function Chapter3Images() {
    return (
        <div>
            <img src={cookiebyte} alt="cookie with bite taken out of it" height="200" width="200"></img>
        </div>
    )
}

function Chapter3Text() {
    return (
        <div>
            <p>So, how are cookies actually delievered?</p>
            <br></br>
            <p>Set-Cookie: name=value</p>
            <br></br>
            <p>So how does your browser actually get cookies? Every</p>
            <p>time you go to google.com, your computer asks for the</p>
            <p>google web page. Google's server then gives you the </p>
            <p>webpage, and along with it, a server can put "add ons"</p>
            <p>called headers, attachedto the web page. One type of</p>
            <p>header is the ~cookie~.</p>
            <br></br>
            <p>When the website sends you it, it's wrapped in Set-Cookie.</p>
            <p>This tells your browser to unwrap it and hold onto the</p>
            <p>cookie.</p>
            <br></br>
            <p>Every time after your browser asks for the same webpage, it</p>
            <p>will send the cookie back in a header that looks like:</p>
            <br></br>
            <p>Cookie: name=value</p>
            <br/>
            <p>This tells that website, heyyy its ya boy againnn</p>
        </div>
    )
}

class Bake extends Component {
    render(){
        return(
            <>
                <section class="hero is-fullheight">
                    <div class="hero-body" style={{display: 'block'}}>
                    <div style={{paddingTop: '8%'}}></div>
                        <div className="center"> 
                            
                            <HTMLFlipBook 
                            width={400} 
                            height={500} 
                            showCover={true} 
                            maxShadowOpacity={0.5}
                            className="mt-6"
                            style={{justifyContent: 'center', left: '20%', right: '20%'}}
                            >
                                <PageCover>Cookie Recipes</PageCover>
                                <Page number={1} header="Chapter 1: Why Bake Cookies?">
                                    <Chapter1Images/>
                                </Page>
                                <Page number={2} header="Chapter 1: Why Bake Cookies?">
                                    <Chapter1Text />
                                </Page>
                                <Page number={3} header="Chapter 2: How Bake Cookies?">
                                    <Chapter2Images />
                                </Page>
                                <Page number={4} header="Chapter 2: How Bake Cookies?">
                                    <Chapter2Text />
                                </Page>
                                <Page number={5} header="Chapter 3: Delivering Cookies">
                                    <Chapter3Images />
                                </Page>
                                <Page number={6} header="Chapter 3: Delivering Cookies">
                                    <Chapter3Text />
                                </Page>
                                <PageCover>The End</PageCover>
                            </HTMLFlipBook>
                            
                            
                         </div>
                   </div>
                </section>
            </>
        )
    }
}

export default Bake;