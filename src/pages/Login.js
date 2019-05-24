import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import ToastMessage from "../components/Msg/ToastMessage";
import Loading from "../components/Loading/Loading";
import {login} from "../lib/user";

class Login extends Component {
    state= {
        id: '',
        pw: '',
        msg: [],
        isLoading: false
    };

    isFullData= ()=>{
        const current=  this.state.msg.slice(0);
        let cnt= 0;
        if(this.state.id=== '') {
            current.push('Insert your Id');
            cnt++;
        }
        if(this.state.pw=== '') {
            current.push('Insert your Password');
            cnt++;
        }

        if(current.length!== this.state.msg.length){
            this.setState({
                ...this.state,
                msg: current
            });
            window.setTimeout(()=>{
                const temp= this.state.msg.slice(0);
                for(let l=0; l< cnt; l++){
                    temp.pop();
                }
                this.setState({
                    ...this.state,
                    msg: temp
                });
            }, 1500);
            return false;
        }

        return true;
    };

    login= ()=>{
        const result= this.isFullData();
        console.log('login');
        if(result){
            this.setState({
                ...this.state,
                isLoading: true
            })
            login(this.state.id, this.state.pw, {
                success: ()=>{
                    this.props.refresher();
                },
                fail: ()=>{

                }
            });
        }
    }


    render() {
        return (
            <div style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}>
                <ToastMessage msg={this.state.msg}/>
                {
                    this.state.isLoading && (<Loading/>)
                }
                <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    display: 'inline-block',
                    maxWidth: '500px',
                    maxHeight: '600px'
                }}>
                    <h1>
                        Welcome to
                        <p style={{fontSize: '3rem', fontWeight: '800', margin: '0'}}>DayDay</p>
                    </h1>
                    <TextField
                        id="standard-name"
                        label="ID"
                        fullWidth
                        margin="normal"
                        onChange={(e)=>{this.setState({...this.state, id: e.target.value})}}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        fullWidth
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={(e)=>{this.setState({...this.state, pw: e.target.value})}}
                    />
                    <br/><br/><br/>
                    <div>
                        <Button variant="contained" color="primary" onClick={()=>{this.login()}}>
                            Login
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="contained" color="primary" >
                            Join
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;