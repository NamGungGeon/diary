import React, {Component} from 'react';
import {user} from "../lib/user";
import Timeline from "../components/Timeline/Timeline";
import Button from "@material-ui/core/Button";

class News extends Component {
    render() {
        return (
            <div>
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
        );
    }
}

export default News;