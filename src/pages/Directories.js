import React, {Component} from 'react';
import Pannel from "../components/Pannel/Pannel";
import Polaroid from "../components/Polaroid/Polaroid";
import FolderOpen from '@material-ui/icons/FolderOpen';
import FolderShared from '@material-ui/icons/FolderShared';
import Button from '@material-ui/core/Button';
import Popup from "../components/Popup/Popup";
import TextField from '@material-ui/core/TextField';
import {getRndStr} from "../lib/commons";
import {user} from '../lib/user';
import ToastMessage from "../components/Msg/ToastMessage";
import Loading from "../components/Loading/Loading";
import Timeline from '../components/Timeline/Timeline'
import {prefix} from "../lib/url";

class Directories extends Component {
    state={
        dirs: [
            {title: '내 다이어리1', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
            {title: '내 다이어리2', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
            {title: '내 다이어리3', type: 'private', code: 'qweqd12df3dad769876sdf', owner: 'asdfasfafafsdfff'},
            {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'asdfasfafafsdfff'},
            {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
            {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
            {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
            {title: '공유 다이어리1', type: 'shared', code: '13466asd887213yewieaw8799', owner: 'sgasgggw1234q2agwg3wegt'},
        ],
        popup: '',
        newDiaryTitle: '',
        msg: [],
        isLoading: false,
    };

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
    requestMakeNewDiary= ()=>{
        this.setState({
            ...this.state,
            popup: (<div>
                        <h3>Make New Diary</h3>
                        <TextField
                            id="standard-name"
                            label="Diary Title"
                            fullWidth
                            onChange={(e)=>{this.setState({...this.state, newDiaryTitle: e.target.value})}}
                            margin="normal"/>
                        <Button variant="contained" color="primary"
                                fullWidth onClick={()=>{this.makeNewDiary(this.state.newDiaryTitle)}}>
                            submit
                        </Button>
                    </div>)
        });
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
    makeNewDiary= (title)=>{
        if(title=== '') {
            this.showToastMsg('you must insert title text of new diary');
            return;
        }

        const diary= {
            title: title,
            type: 'private',
            code: getRndStr(),
            owner: user.uid,
        };

        const dirs= this.state.dirs.slice(0);
        dirs.push(diary);

        this.setState({
           ...this.state,
            isLoading: true,
        });
        window.setTimeout(()=>{
            this.setState({
                ...this.state,
                dirs: dirs,
                isLoading: false,
                popup: ''
            });

        }, 1500);
    }


    render() {
        const {history}= this.props;
        return (
            <div>
                {this.popup()}
                {
                    this.state.isLoading && (<Loading/>)
                }
                <ToastMessage msg={this.state.msg}/>
                <div>
                    <h1>
                        My Diary
                    </h1>
                    <div>
                        {
                            this.state.dirs.map((value)=>{
                                if(value.type=== 'private')
                                    return (<Polaroid
                                            data={{listener: ()=>{history.push(`${prefix}/dirs/${value.code}`)}, img: (<FolderOpen fontSize={"large"}/>), content: value.title}}/>);
                            })
                        }
                    </div>
                    <br/>
                    <Button variant="outlined" color="inherit" onClick={this.requestMakeNewDiary}>
                        Make
                    </Button>
                </div>
                <div>
                    <h1>
                        Shared Diary
                    </h1>
                    <div>
                        {
                            this.state.dirs.map((value)=>{
                                if(value.type=== 'shared')
                                    return (<Polaroid
                                        data={{listener: ()=>{history.push(`${prefix}/dirs/${value.code}`)}, img: (<FolderShared fontSize={"large"}/>), content: value.title}}/>);
                            })
                        }
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Directories;