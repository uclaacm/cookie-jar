import React, { Component } from "react";
import HTMLFlipBook from "react-pageflip";
import './bake.scss';
import computer from './images/computer.png';
import server from './images/server.png';
import arrow from './images/arrow.png';
import ingredients from './images/ingredients.png';
import packagedcookie from './images/packagedcookie.png';
import boxedcookie from './images/boxedcookie.png';

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
            <img src={computer} alt="computer"></img>
            <img src={arrow} alt="arrow pointing from left to right" height="50" width="50"></img>
            <img src={server} alt="server"></img>
        </div>
    );
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
                                </Page>
                                <Page number={3} header="Chapter 2: How Bake Cookies?">
                                    <img src={ingredients} alt="ingredients" width="300" height="300"></img>
                                </Page>
                                <Page number={4} header="Chapter 2: How Bake Cookies?">
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
                                    <p>A smidge of domain</p></Page>
                                <Page number={5} header="Chapter 3: Delivering Cookies">
                                    <img src={boxedcookie} alt="box of cookies" width="200" height="200"></img>
                                    <img src={packagedcookie} alt="packaged cookie" width="300" height="300"></img>
                                </Page>
                                <Page number={6} header="Chapter 3: Delivering Cookies">
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