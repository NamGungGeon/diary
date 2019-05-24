import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Timeline from "../components/Timeline/Timeline";
import {user} from "../lib/user";
import ToastMessage from "./Directories";
import Pannel from "../components/Pannel/Pannel";

class First extends Component {
    render() {
        return (
            <div>

                <div>
                    <Pannel title={'Panel'} content={'REACT IS GOD'}/>
                    <h1>
                        Current Updated (Timeline)
                    </h1>
                    <Timeline
                        data={[
                            {auth: 'sdfasfsaf', content: 'ㅇㅇ', date: '2019-01-02', diaryTitle: 'ㅗ'},
                            {auth: 'sdfasfsaf', content: 'ㅈㅈ', date: '2019-01-02', diaryTitle: 'ㅗ'},
                            {auth: 'sdfasfsaf', content: 'ㅋㅋㅋㅋㅋㅋ', date: '2019-01-02', diaryTitle: 'ㅗ'},
                            {auth:  user.uid, content: 'React is GOD', date: '2019-01-02', diaryTitle: 'ㅗ'}
                        ]}/>
                    <br/>
                    <Button variant="outlined" color="inherit" >
                        Load More
                    </Button>
                </div>
            </div>
        );
    }
}

export default First;