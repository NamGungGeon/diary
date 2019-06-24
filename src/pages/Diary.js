import React, {Component} from 'react';
import Settings from '@material-ui/icons/Settings';
import AccessTime from '@material-ui/icons/AccessTime';
import People from '@material-ui/icons/People';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import queryString from 'query-string';
import Calendar from "../components/Calendar/Calendar";
import {getCurrentMonth, getCurrentYear} from "../lib/dateUtil";
import {UiBundle} from "../lib/ui";
import dayday from "../networks/dayday";
import Button from "@material-ui/core/Button";
import {user} from "../lib/user";
import TodoList from "../components/TodoList/TodoList";
import TextField from "@material-ui/core/TextField";
import TodoContainer from "../containers/TodoContainer/TodoContainer";

class Diary extends Component {
    state= {
        diary: {},
        viewType: 'timeline',
    };

    uiBundle= UiBundle(this);

    componentDidMount() {
        const {location}= this.props;
        const query= queryString.parse(location.search);
        const {dirCode}= query;

        this.uiBundle.loading.start();
        dayday.getDiaryInfo(dirCode, {
            success: (data)=>{
                this.uiBundle.loading.end();
                this.setState({
                    ...this.state,
                    diary: data
                })
            },
            fail: (e)=>{
                this.uiBundle.loading.end();
                this.uiBundle.exception.raise('Maybe you have not permission for this diary');
            }
        });
    }

    openSetting= ()=>{
        this.uiBundle.popup.make((<div><h3>Settings</h3></div>));
    }
    openDelete= ()=>{
        this.uiBundle.popup.make(
            (<div>
                <h3>Are you really want to delete this Diary?</h3>
                <h5>This operation is unrecoverable</h5>
                <Button variant="contained" color="secondary"
                        fullWidth onClick={async () => {
                    const {history, location} = this.props;
                    const query = queryString.parse(location.search);
                    const {dirCode} = query;
                    this.uiBundle.loading.start();

                    await dayday.removeDiary(dirCode, {
                        success: () => {
                            this.uiBundle.loading.end();
                            history.goBack();
                        },
                        fail: () => {
                            this.uiBundle.loading.end();
                            this.uiBundle.toaster.cooking('You have not permission for deleting this diary or Unknown Error occur (Retry)');
                        }
                    });
                }}>
                    Yes! Do delete!
                </Button>
            </div>)
        );
    }
    moveForWrite= ()=>{
        const {history, match}= this.props;
        history.push(match.url+ '/write');
    }
    openShareStatusPopup= ()=>{
        this.uiBundle.popup.make(
            (<div>
                <h2>Members</h2>
                {
                    this.state.diary.sharedTo.map((id)=>{
                        return (
                            <div style={{clear: 'both', cursor: 'pointer'}}>
                                {
                                    id=== this.state.diary.ownerId?
                                        (<Person fontSize={"normal"} style={{float: 'left', clear: 'left'}}/>)
                                        :(<PersonOutline fontSize={"normal"} style={{float: 'left', clear: 'left'}}/>)
                                }
                                {
                                    user.uid=== this.state.diary.ownerId && id!== this.state.diary.ownerId?
                                        (<Delete fontSize={"normal"} style={{float: 'left'}}/>)
                                        :''
                                }
                                &nbsp;&nbsp;&nbsp;
                                <span>{id}</span>
                            </div>)
                    })
                }
            </div>)
        )
    };
    openRequestShare= ()=>{
        this.uiBundle.popup.make(
            (<div>
                <h2>Share this diary with others</h2>
                <h5>
                    Note!<br/>
                    Although you sent request to peer , peer can't use immediately.<br/>
                    The peer  who invited to here must accept invitation in request menu.
                </h5>
                <TextField
                    id="standard-name"
                    label="Peer's ID"
                    fullWidth
                    margin="normal"
                    onChange={(e)=>{this.setState({...this.state, id: e.target.value})}}
                />
                <Button variant="contained" color="secondary"
                        fullWidth>
                    Share
                </Button>
            </div>)
        );
    }

    render() {
        const {diary}= this.state;
        const {match, history}= this.props;
        return (
            <div>
                {
                    this.uiBundle.render()
                }
                <h1>
                    {diary.title}
                </h1>
                <div style={{textAlign: 'left'}}>
                    <Create fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.moveForWrite}/>&nbsp;&nbsp;
                    <PersonAdd fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.openRequestShare}/>&nbsp;&nbsp;
                    <People fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.openShareStatusPopup}/>&nbsp;&nbsp;
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
                    Diary type: {diary.sharedTo && diary.sharedTo.length===1? 'private': 'sharing'}
                    <br/>
                </div>
                <br/>
                <TodoContainer diary={this.state.diary} uiBundle={this.uiBundle} location={this.props.location} refresher={this.componentDidMount}/>
                <br/>
                <br/>
                <div>
                    <h2>Calendar</h2>
                    {
                        this.state.diary.posts &&
                        <Calendar current={`${getCurrentYear()}-${getCurrentMonth()}`} name={[]} hovered={() => {
                        }}
                                  getContent={(date) => {
                                      const results = [];
                                      this.state.diary.posts.map((post) => {
                                          if (post.created === date)
                                              results.push(post);
                                      });

                                      return results.map((post) => {
                                          return (<div onClick={() => {
                                              history.push(`${match.url}/read/${post.postId}`)
                                          }}>{post.title}</div>)
                                      });

                                  }}/>
                    }
                </div>
            </div>
        );
    }
}

export default Diary;