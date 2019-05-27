import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import TextEditor from "../components/TextEditor/TextEditor";
import Button from '@material-ui/core/Button';
import {UiBundle} from "../lib/ui";
import dayday from "../networks/dayday";
import queryString from "query-string";
import moment from "moment";

class Write extends Component {
    state= {
        title: '',
        content: '',
    }

    uiBundle= UiBundle(this);


    observer= (text)=>{
        this.setState({
            ...this.state,
            content: text,
        });
    }
    save= ()=>{
        this.uiBundle.loading.start();

        const {history, location}= this.props;
        const query= queryString.parse(location.search);
        const {dirCode}= query;
        dayday.writePost(dirCode, this.state.title, this.state.content, moment().format('YYYY-MM-DD'), {
            success:()=>{
                this.uiBundle.loading.end();
                history.goBack();
            },
            fail: (e)=>{
                this.uiBundle.exception.raise(e);
                this.uiBundle.loading.end();
            },
        });
    }


    render() {
        return (
            <div>
                {this.uiBundle.render()}
                <h1>Describe Your Today</h1>
                <TextField
                    id="standard-full-width"
                    label="Title"
                    style={{ margin: 8 }}
                    placeholder="Express your today using 1 line"
                    fullWidth
                    margin="none"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e)=>{
                        this.setState({
                            ...this.state,
                            title: e.target.value,
                        })
                    }}
                />
                <br/>
                <br/>
                <TextEditor observer={this.observer}/>
                <br/>
                <br/>
                <br/>
                <div style={{textAlign: 'right'}}>
                    <Button variant="outlined" color="inherit" onClick={this.save}>
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

export default Write;