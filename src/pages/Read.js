import React, {Component} from 'react';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import dayday from "../networks/dayday";
import queryString from "query-string";
import {UiBundle} from "../lib/ui";
import TextField from "./Directories";
import Button from "@material-ui/core/Button";

class Read extends Component {
    state= {
    }

    uiBundle= UiBundle(this);

    async componentDidMount() {
        const {location}= this.props;
        const query= queryString.parse(location.search);
        const {dirCode, contentCode}= query;

        this.uiBundle.loading.start();
        await dayday.getPost(dirCode, contentCode, {
            success: (data)=>{
                this.uiBundle.loading.end();
                this.setState({
                    ...this.state,
                    data: data
                })
            },
            fail: (e)=>{
                this.uiBundle.loading.end();
                this.uiBundle.exception.raise(e);
            }
        });
    }

    moveCorrect= ()=>{
        this.props.history.push(this.props.match.url+ '/correct');
    }

    requestDelete(props){
        this.uiBundle.popup.make(
            (<div>
                <h3>Are you really want to delete this Post?</h3>
                <Button variant="contained" color="secondary"
                        fullWidth onClick={async ()=>{
                            const {history, location}= props;
                            const query= queryString.parse(location.search);
                            const {dirCode, contentCode}= query;
                            console.log(this.uiBundle.toaster);
                            this.uiBundle.loading.start();

                            await dayday.removePost(dirCode, contentCode, {
                                success: ()=>{
                                    this.uiBundle.loading.end();
                                    history.goBack();
                                },
                                fail: ()=>{
                                    this.uiBundle.loading.end();
                                    this.uiBundle.toaster.cooking('You have not permission for deleting this post or Unknown Error occur (Retry)');
                                }
                            });
                }}>
                    Yes! Do delete!
                </Button>
            </div>)
        );
    }
    //
    // const data= {
    //     created: '2019-05-21',
    //     creator: 'ㅇㅇ',
    //     creatorId: 'dagweas78689as7df698as768df9as',
    //     title: 'This is test title',
    //     content: 'This is test content',
    // };
    renderContent= ()=>{
        if(this.state.data){
            const {data}= this.state;

            return (<div>
                <h1>{data.title}</h1>
                <div style={{textAlign: 'left'}}>
                    <Create fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.moveCorrect}/>&nbsp;&nbsp;
                    <Delete fontSize={"normal"} style={{cursor: 'pointer'}} onClick={()=>{this.requestDelete(this.props)}}/>&nbsp;&nbsp;
                </div>
                <br/>
                <div style={{
                    fontSize: '0.8rem',
                    color: '#777777'
                }}>
                    Created at: {data.created}
                    <br/>
                    creator: {data.creator}
                </div>
                <br/>
                <div>
                    {data.content}
                </div>
                <br/>
                <br/>
                <br/>
                <Button variant="contained" color="secondary" onClick={()=>{this.uiBundle.exception.raise()}}>
                    Exception Raiser
                </Button>
            </div>)
        }
    }
    render() {
        return (
            <div>
                {this.uiBundle.render()}
                {this.renderContent()}
            </div>
        );
    }
}

export default Read;