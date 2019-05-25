import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import TextEditor from "../components/TextEditor/TextEditor";
import Button from '@material-ui/core/Button';
import Loading from "./Diary";
import ToastMessage from "../components/Msg/ToastMessage";
import {prefix} from "../lib/url";

class Write extends Component {
    state= {
        text: '',
        msg: [],
        isLoading: false,
        targetDiary: '',
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            targetDiary: this.props.dirCode
        });
    }

    observer= (text)=>{
        this.setState({
            ...this.state,
            text: text,
        });
    }
    save= ()=>{
        this.props.history.goBack();
    }


    showToastMsg= (val)=>{
        const msg= this.state.msg;
        msg.push(val);

        this.setState({
            ...this.state,
            msg: msg
        })
        window.setTimeout(()=>{
            const temp= this.state.msg;
            temp.pop();
            this.setState({
                ...this.state,
                msg: temp
            })
        }, 1500);
    };
    render() {
        return (
            <div>
                {
                    this.state.isLoading && (<Loading/>)
                }
                <ToastMessage msg={this.state.msg}/>
                <h1>Update Diary Content</h1>
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