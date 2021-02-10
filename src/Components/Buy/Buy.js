import React, { Component } from "react";
import './Buy.scss';

class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: ['Welcome to our shops!',
                    'You can shop for all the cookies you like~',
                    'You can learn about your activities here.',
                    'Oh, be sure to stay alive.',
                    'Have fun!'],  // most recent msg -> least recent msg
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
        console.log(new_msg_array);
        this.setState({
            msg: new_msg_array
        })
    }

    render(){
        var msg = this.state.msg;
        return ( 
            <>
                <section class="hero is-fullheight">
                    <div class="hero-body">
                        <div  style={{display:'block'}}>
                            <button onClick={this.addMsg} value={'1'}>store1</button>
                            <button onClick={this.addMsg} value={'2'}>store2</button>
                            <button onClick={this.addMsg} value={'3'}>store3</button>
                            <button onClick={this.addMsg} value={'4'}>store4</button>
                            <div className="my-6"></div>
                            {
                                msg.map(val => 
                                    <div class="columns">{val}</div>
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