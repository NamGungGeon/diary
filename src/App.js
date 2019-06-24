
import './App.css';
import {Route} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Directories from "./pages/Directories";
import Diary from "./pages/Diary";
import Read from "./pages/Read";
import Write from "./pages/Write";
import Request from './pages/Requests'
import {isLogin, joinState, user, userObserver} from "./lib/user";

import React, {Component} from 'react';
import Login from "./pages/Login";
import {prefix} from "./lib/url";
import Settings from "./pages/Settings";
import News from "./pages/News";
import Correct from "./pages/Correct";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Statistics from "./pages/Statistics";

class App extends Component {
    state= {
        loginState: isLogin()
    };
    componentDidMount() {
        userObserver.action= (type)=>{
            this.setState({
                loginState: isLogin(),
            })
        }
    }

    refreshLoginState= ()=>{
        this.setState({
            ...this.state,
            loginState: isLogin()
        });
    }

    render() {
        if(!this.state.loginState){
            if(joinState()){
                return (
                    <div>
                        <Route path={prefix+ '/'} render={()=>(<Login refresher={this.refreshLoginState}/>)}></Route>
                        <Route exact path={prefix+ '/join'} render={()=>(<Join refresher={this.refreshLoginState}/>)}></Route>
                    </div>
                );
            }else{
                user.token= '';
                user.uid= '';
                return (<Login refresher={this.refreshLoginState}/>);
            }
            // if(joinState()) return (<div><Join refresher={this.refreshLoginState}/></div>);
            // else return (<div><Login refresher={this.refreshLoginState}/></div>);
        }
        return (
            <div className="App">
                <Navigation refresher={this.refreshLoginState}/>
                <div  className='content' style={{
                }}>
                    <div style={{
                        display: 'inline-block',
                        width: '100%',
                        maxWidth: '1000px'
                    }}>
                        <Route exact path={prefix+ '/'} component={Home}></Route>
                        <Route exact path={prefix+ '/dirs'} component={Directories}></Route>
                        <Route exact path={prefix+ '/dirs/:dirCode'} component={Diary}></Route>
                        <Route exact path={prefix+ '/dirs/:dirCode/write'} component={Write}></Route>
                        <Route exact path={prefix+ '/dirs/:dirCode/read/:contentCode'} component={Read}></Route>
                        <Route exact path={prefix+ '/dirs/:dirCode/read/:contentCode/correct'} component={Correct}></Route>
                        <Route exact path={prefix+ '/requests'} component={Request}></Route>
                        <Route exact path={prefix+ '/settings'} component={Settings}></Route>
                        <Route exact path={prefix+ '/timeline'} component={News}></Route>
                        <Route exact path={prefix+ '/statistics'} component={Statistics}></Route>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
