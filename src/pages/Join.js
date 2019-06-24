import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {UiBundle} from "../lib/ui";
import dayday from "../networks/dayday";
import {login} from "../lib/user";
import {prefix} from "../lib/url";
import {withRouter} from "react-router-dom";

class Join extends Component {
    state= {
        id: '',
        pw: '',
        _pw: '',
        nickname: '',
        email: '',
    };
    uiBundle= UiBundle(this);


    checkInputs= ()=>{
        console.log(this.state);
        const {id, pw, _pw, nickname, email}= this.state;
        if(id=== ''){
            this.uiBundle.toaster.cooking('ID is empty');
            return false;
        }
        if(pw=== ''){
            this.uiBundle.toaster.cooking('Password is empty');
            return false;
        }
        if(pw!== _pw){
            this.uiBundle.toaster.cooking('Password and Password Check dont match');
            return false;
        }

        return true;
    };

    startJoin= ()=>{
        if(this.checkInputs()){
            const {id, pw}= this.state;
            this.uiBundle.loading.start();
            login(id, pw, {
                success: ()=>{
                    console.log('success');
                    console.log(this.props.history);
                    this.uiBundle.loading.end();
                    this.props.refresher();
                    this.props.history.push(`${prefix}/`);
                    //try login
                },
                fail: ()=>{
                    this.uiBundle.loading.end();
                    this.uiBundle.toaster.cooking('fail to register. check your inputs');
                }
            });
        }
    }


    render() {
        return (
            <div style={{
                position: 'absolute',
                zIndex: '999',
                top: '0',
                left: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#f9f9f9'
            }}>

               <div style={{
                   padding: '1rem',
                   display: 'inline-block',
                   maxWidth: '700px',
               }}>
                   {
                       this.uiBundle.render()
                   }
                   <h1>
                        Just need 1 step.
                   </h1>
                   <h3>It's so simple!</h3>
                   <TextField
                       id="outlined-dense"
                       label="ID"
                       margin="dense"
                       variant="outlined"
                       helperText="You will use this value when login"
                       fullWidth
                       onChange={(e)=>{
                           this.setState({
                              ...this.state,
                              id: e.target.value,
                           });
                       }}
                   />
                   <TextField
                       id="outlined-dense"
                       label="Password"
                       margin="dense"
                       variant="outlined"
                       helperText="You will use this value when login"
                       fullWidth
                       onChange={(e)=>{
                           this.setState({
                               ...this.state,
                               pw: e.target.value,
                           });
                       }}
                   />
                   <TextField
                       id="outlined-dense"
                       label="Password Recheck"
                       margin="dense"
                       variant="outlined"
                       helperText="Rewrite above pw. just recheck process"
                       fullWidth
                       onChange={(e)=>{
                           this.setState({
                               ...this.state,
                               _pw: e.target.value,
                           });
                       }}
                   />
                   <TextField
                       id="outlined-dense"
                       label="Optional) Nickname"
                       margin="dense"
                       variant="outlined"
                       helperText="Nickname is shown when you use shared or sharing diary"
                       fullWidth
                       onChange={(e)=>{
                           this.setState({
                               ...this.state,
                               nickname: e.target.value,
                           });
                       }}
                   />
                   <TextField
                       id="outlined-dense"
                       label="Optional) email"
                       margin="dense"
                       variant="outlined"
                       helperText="If you forget id/pw, you can find that with email"
                       fullWidth
                       onChange={(e)=>{
                           this.setState({
                               ...this.state,
                               email: e.target.value,
                           });
                       }}
                   />
                   <br/><br/><br/><br/>
                   <Button variant="contained" color="primary" fullWidth onClick={()=>{
                       this.startJoin();
                   }}>
                       commit
                   </Button>
               </div>
            </div>
        );
    }
}

export default withRouter(Join);