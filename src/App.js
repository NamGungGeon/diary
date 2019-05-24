
import './App.css';
import {First} from "./pages";
import {Route} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Directories from "./pages/Directories";
import Diary from "./pages/Diary";
import ContentViewer from "./pages/ContentViewer";
import Write from "./pages/Write";
import Request from './pages/Requests'
import {isLogin} from "./lib/user";

import React, {Component} from 'react';
import Login from "./pages/Login";

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
                <div style={{
                    marginLeft: '200px',
                    padding: '2rem'
                }}>
                    <div style={{
                        display: 'inline-block',
                        width: '100%',
                        maxWidth: '1000px'
                    }}>
                        <Route exact path={'/'} component={First}></Route>
                        <Route exact path={'/dirs'} component={Directories}></Route>
                        <Route exact path={'/dirs/:dirCode'} component={Diary}></Route>
                        <Route exact path={'/dirs/:dirCode/write'} component={Write}></Route>
                        <Route exact path={'/dirs/:dirCode/:idx'} component={ContentViewer}></Route>

                        <Route exact path={'/requests'} component={Request}></Route>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
