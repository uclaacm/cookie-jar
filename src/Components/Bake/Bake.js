import React, { Component } from "react";
import HTMLFlipBook from "react-pageflip";
import './bake.scss';


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
            <h2 className="page-header">Page header - {props.number}</h2>
            <div className="page-image"></div>
            <div className="page-text">{props.children}</div>
            <div className="page-footer">{props.number + 1}</div>
        </div>
        </div>
    );
});

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
                                <Page number={1}>Our story (images)</Page>
                                <Page number={2}>Our story (texts)</Page>
                                <Page number={3}>Chapter 1: Why bake cookies (images)</Page>
                                <Page number={4}>Chapter 1: Why bake cookies (texts)</Page>
                                <Page number={5}>Chapter 2: How do we bake cookies (images)</Page>
                                <Page number={6}>Chapter 2: How do we bake cookies (texts)</Page>
                                <Page number={7}>Chapter 3: How do we deliver cookies (images)</Page>
                                <Page number={8}>Chapter 3: How do we deliver cookies (texts)</Page>
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