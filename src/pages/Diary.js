import React, {Component} from 'react';
import Settings from '@material-ui/icons/Settings';
import AccessTime from '@material-ui/icons/AccessTime';
import People from '@material-ui/icons/People';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import queryString from 'query-string';
import Calendar from "../components/Calendar/Calendar";
import {getCurrentMonth, getCurrentYear} from "../lib/dateUtil";
import {UiBundle} from "../lib/ui";
import dayday from "../networks/dayday";
import Button from "@material-ui/core/Button";
import {user} from "../lib/user";

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
                <Button variant="contained" color="secondary"
                        fullWidth onClick={async ()=>{
                    const {history, location}= this.props;
                    const query= queryString.parse(location.search);
                    const {dirCode}= query;
                    this.uiBundle.loading.start();

                    await dayday.removeDiary(dirCode, {
                        success: ()=>{
                            this.uiBundle.loading.end();
                            history.goBack();
                        },
                        fail: ()=>{
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
                </div>
                <br/>
                <div>
                    <h2>To-do List</h2>
                    {
                        this.state.diary.todos &&
                        this.state.diary.todos.map((todo)=>{
                            return (<p style={{cursor: 'pointer'}}><h5>
                                    {todo.content}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{fontSize: '0.8rem', color: '#a9a9a9', fontStyle: 'italic', fontWeight: '500'}}>-{todo.creator=== user.uid? 'me': todo.creator}</span>
                                </h5></p>);
                        })
                    }
                </div>
                <br/>
                <br/>
                <div>
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