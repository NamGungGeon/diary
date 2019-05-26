import React, {Component} from 'react';
import Pannel from "../components/Pannel/Pannel";

class First extends Component {
    render() {
        return (
            <div>

                <div>
                    <Pannel title={'Panel'} content={'REACT IS GOD'}/>
                </div>
            </div>
        );
    }
}

export default First;