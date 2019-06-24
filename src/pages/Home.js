import React, {Component} from 'react';
import Pannel from "../components/Pannel/Pannel";

class Home extends Component {
    render() {
        return (
            <div>
                <Pannel title={'Notice'} content={'HELLO'}/>
                <h1>Welcome!</h1>
                <p>
                    Save your today with DayDay!
                </p>
            </div>
        );
    }
}

export default Home;