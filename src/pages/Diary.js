import React, {Component} from 'react';
import Loading from "../components/Loading/Loading";
import ToastMessage from "../components/Msg/ToastMessage";
import Popup from "../components/Popup/Popup";
import Settings from '@material-ui/icons/Settings';
import AccessTime from '@material-ui/icons/AccessTime';
import People from '@material-ui/icons/People';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Delete from '@material-ui/icons/Delete';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Create from '@material-ui/icons/Create';
import queryString from 'query-string';
import Calendar from "../components/Calendar/Calendar";
import {getCurrentMonth, getCurrentYear} from "../lib/dateUtil";
import {NavLink} from "react-router-dom";


class Diary extends Component {
    state= {
        dirCode: '',
        diary: {},
        viewType: 'timeline',
        popup: '',
        msg: [],
        isLoading: false,
    };

    componentDidMount() {
        const {location}= this.props;
        const query= queryString.parse(location.search);
        const {dirCode}= query;
        this.setState({
            ...this.state,
            dirCode: dirCode,
            isLoading: true
        });

        window.setTimeout(()=>{
            this.setState({
                ...this.state,
                diary: {
                    title: '나의 다이어리',
                    createDate: '2019-01-12',
                    type: 'private',
                    owner: '김재선',
                    dataCnt: 123,
                },
                dirCode: dirCode,
                isLoading: false,
            })}, 1500);
    }

    popup= ()=>{
        if(this.state.popup=== ''){
            return '';
        }else{
            return (<Popup contents={this.state.popup}
                           plzClose={
                               ()=>{this.setState({...this.state, popup: ''})}
                           }/>);
        }
    };

    openSetting= ()=>{
        this.setState({
            ...this.state,
            popup:
                (<div>
                    Settings
                </div>)
        });
    }
    openDelete= ()=>{
        this.setState({
            ...this.state,
            popup:
                (<div>
                    Delete
                </div>)
        });
    }

    render() {
        const {diary}= this.state;
        return (
            <div>
                {this.popup()}
                {
                    this.state.isLoading && (<Loading/>)
                }
                <ToastMessage msg={this.state.msg}/>
                <h1>
                    {diary.title}
                </h1>
                <div style={{textAlign: 'left'}}>
                    <Create fontSize={"normal"} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;
                    <PersonAdd fontSize={"normal"} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;
                    <People fontSize={"normal"} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;
                    <AccessTime fontSize={"normal"} style={{cursor: 'pointer'}}/>&nbsp;&nbsp;
                    <Delete fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.openDelete}/>&nbsp;&nbsp;
                    <Settings fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.openSetting}/>&nbsp;&nbsp;
                </div>
                <br/>
                <div style={{
                    fontSize: '0.8rem',
                    color: '#777777'
                }}>
                    Created at: {diary.createDate}
                    <br/>
                    Owner: {diary.owner}
                    <br/>
                    Diary type: {diary.type}
                    <br/>
                    Data Cnt: {diary.dataCnt}
                </div>
                <br/>
                <div>
                    <h2>To-do List</h2>
                    -
                </div>
                <br/>
                <br/>
                <h3 style={{textAlign: 'center'}}>
                    <NavigateBefore fontSize={"large"} style={{cursor: 'pointer', float: 'left'}}/>
                    <NavigateNext fontSize={"large"} style={{cursor: 'pointer', float: 'right'}}/>
                    {`${getCurrentYear()} / ${getCurrentMonth()}`}
                </h3>
                <div>
                    <Calendar current={`${getCurrentYear()}-${getCurrentMonth()}`} name={[]} hovered={()=>{}} getContent={()=>{return [];}}/>
                </div>
            </div>
        );
    }
}

export default Diary;