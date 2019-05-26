
import './App.css';
import {Route} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Directories from "./pages/Directories";
import Diary from "./pages/Diary";
import Read from "./pages/Read";
import Write from "./pages/Write";
import Request from './pages/Requests'
import {isLogin} from "./lib/user";

import React, {Component} from 'react';
import Login from "./pages/Login";
import {prefix} from "./lib/url";
import Settings from "./pages/Settings";
import News from "./pages/News";
import Correct from "./pages/Correct";
import Home from "./pages/Home";

class App extends Component {
    state= {
        loginState: isLogin()
    }
    refreshLoginState= ()=>{
        this.setState({
            ...this.state,
            loginState: isLogin()
        });
    }

    render() {
        if(!isLogin()){
            return (<div><Login refresher={this.refreshLoginState}/></div>);
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
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
