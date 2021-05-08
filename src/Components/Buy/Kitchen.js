import React, { Component } from "react";
import './Buy.css';
import './Kitchen.css';

class Stove extends Component {
    render() {
        return( 
            <div class="stove">
                <div class="burner-row">
                    <div class="burner"></div>
                    <div class="burner"></div>
                </div>
                <div class="burner-row">
                    <div class="burner"></div>
                    <div class="burner"></div>
                </div>
            </div>
        )
    } 
} export { Stove } 

class Oven extends Component {
    render() {
        return( 
            <div class="oven">
                <div class="burner-row">
                    <div class="mx-4" style={{flexGrow:1}}></div>
                    <div style={{flexGrow:2,display:"flex"}}>
                        <div class="burner"></div>
                        <div class="burner"></div>
                        <div class="burner"></div>
                    </div>
                    <div class="mx-4" style={{flexGrow:1}}></div>
                </div>
                <div class="burner-row">
                    <div class="oven-door"></div>
                </div>
                
            </div>
        )
    } 
} export { Oven } 

class Door extends Component {
    color = () => this.props.color ? "green" : "brown";
    render() {
        return( 
            <div class="door" style={{backgroundColor:this.color()}}>
                <div class="door-window">
                    <p>Employees Only</p>
                </div>
                <div class="my-6"></div>
            </div>
        )
    }
} export { Door };