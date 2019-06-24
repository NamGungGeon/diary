import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import dayday from "../networks/dayday";
import {UiBundle} from "../lib/ui";
import {prefix} from "../lib/url";
import {NavLink} from "react-router-dom";
import {login, user} from "../lib/user";

class Login extends Component {
    state= {
        id: '',
        pw: '',
    };

    uiBundle= UiBundle(this);

    inputCheck= ()=>{
        if(this.state.id=== ''){
            this.uiBundle.toaster.cooking('ID input is empty');
            return false;
        }
        if(this.state.pw=== ''){
            this.uiBundle.toaster.cooking('PW input is empty');
            return false;
        }
        return true;
    };

    login= ()=>{
        if(this.inputCheck()){
            this.uiBundle.loading.start();
            login(this.state.id, this.state.pw, {
                success: (data)=>{
                    // parameter 'data' is token
                    this.props.refresher();
                    this.uiBundle.loading.end();

                },
                fail: (e)=>{
                    //fail to login
                    this.uiBundle.toaster.cooking('Invalid id or pw');
                    this.uiBundle.loading.end();
                }
            });
        }
    };


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
                {
                    this.uiBundle.render()
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
                        <p style={{fontSize: '4rem', fontWeight: '800', margin: '0'}}>DayDay</p>
                    </h1>
                    <br/><br/>
                    <TextField
                        variant="outlined"
                        id="standard-name"
                        label="ID"
                        fullWidth
                        margin="normal"
                        onChange={(e)=>{this.setState({...this.state, id: e.target.value})}}
                    />
                    <TextField
                        variant="outlined"
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
                        <Button variant="contained" color="primary" onClick={()=>{this.login()}} style={{float: 'left', width: '45%'}}>
                            Login
                        </Button>
                        <Button variant="outlined" color="primary"  style={{float: 'right', width: '45%'}}
                                onClick={()=>{
                                    console.log('clicked');
                                    //temp info
                                    user.uid= 'temp';
                                    user.token= 'temp';
                                    this.props.refresher();
                                }}>
                            Join
                        </Button>
                        <br/><br/><br/>
                        <Button variant="contained" color="secondary" fullWidth
                            onClick={()=>{this.uiBundle.toaster.cooking('Not made yet. Good Luck :)')}}>
                            Forget my account
                        </Button>
                    </div>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                </div>
            </div>
        );
    }
}

export default Login;