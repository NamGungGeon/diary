import React, {Component} from 'react';
import Pannel from "../components/Pannel/Pannel";
import FatalAlert from "../components/FatalAlert/FatalAlert";

class Home extends Component {
    render() {
        return (
            <div>
                <Pannel title={'Panel'} content={'REACT IS GOD'}/>
                <h1>Welcome!</h1>
                <p>
                    Save your today with DayDay!
                </p>
            </div>
        );
    }
}

export default Home;