import React, { Component } from "react";
import './Buy.css'

class Buy extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            msg: ['Welcome to our shops!',
                    'You can shop for all the cookies you like~',
                    'You can learn about your activities here.',
                    'Oh, be sure to stay alive.',
                    'Have fun!'],  // most recent msg -> least recent msg
            first_load: true
        }
    }

    addMsg = (e) => {
        var id = e.target.value;
        var new_msg = "";
        
        if (id === '1') new_msg = "Entered store 1";
        else if (id === '2') new_msg = "Entered store 2";
        else if (id === '3') new_msg = "Entered store 3";
        else if (id === '4') new_msg = "Entered store 4";
        // add additional msg later

        var new_msg_array = this.state.msg;
        new_msg_array.reverse();
        new_msg_array.push(new_msg);
        new_msg_array.shift();
        new_msg_array.reverse();
        // console.log(new_msg_array);
        this.setState({
            msg: new_msg_array,
            first_load: false
        })
    }

    render(){
        var val = this.state.msg;
        var fst = this.state.first_load;
        // console.log(msg);
        return ( 
            <>
                <section class="hero is-fullheight">
                    <div class="hero-body">
                        <div  style={{display:'block'}}>
                            <div class="columns">
                                <div className="column">add life and hearts </div>
                                <div className="column">
                                    <button onClick={this.addMsg} value={'1'}>store1</button>
                                    <button onClick={this.addMsg} value={'2'}>store2</button>
                                    <button onClick={this.addMsg} value={'3'}>store3</button>
                                    <button onClick={this.addMsg} value={'4'}>store4</button>
                                </div>
                            </div>

                            <div className="my-6"></div>
                            <div className="dialogue_container">
                            <div className="dialogue">
                                <div class="columns has-text-weight-bold">{val[0]}</div>
                                <div class="columns has-text-weight-bold" style={fst ? {opacity:1} : {opacity:0.85}}>{val[1]}</div>
                                <div class="columns has-text-weight-bold" style={fst ? {opacity:1} : {opacity:0.7}}>{val[2]}</div>
                                <div class="columns has-text-weight-bold" style={fst ? {opacity:1} : {opacity:0.55}}>{val[3]}</div>
                                <div class="columns has-text-weight-bold" style={fst ? {opacity:1} : {opacity:0.4}}>{val[4]}</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> 
        )
    }
}

export default Buy;