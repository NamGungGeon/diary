import React, {Component} from 'react';
import dayday from "../networks/dayday";
import {user} from "../lib/user";
import Button from "@material-ui/core/Button"
import {UiBundle} from "../lib/ui";


class Requests extends Component {
    state= {
        requests: [],
    }
    uiBundle= UiBundle(this);

    componentDidMount() {
        this.uiBundle.loading.start();
        dayday.getRequests(user.uid, user.token, {
            success: (requests)=>{
                this.uiBundle.loading.end();
                this.setState({
                    ...this.state,
                    requests: requests,
                })
            },
            fail: (e)=>{
                this.uiBundle.loading.end();
                this.uiBundle.toaster.cooking(e);
            }
        })
    }

    render() {
        const boldStyle= {
            fontWeight: '600',
        };
        const descStyle= {
            color: '#999999',
            fontStyle: 'italic',
        }
        return (
            <div>
                {
                    this.uiBundle.render()
                }
                <h1>Requests</h1>
                {
                    (this.state.requests && this.state.requests.length!== 0)&&
                        this.state.requests.map((request)=>{
                            return (
                                <div style={{
                                    margin: '2rem 0',
                                }}>
                                    <span style={boldStyle}>{request.owner}</span>
                                    &nbsp;has invited you in&nbsp;
                                    <span style={boldStyle}>{request.diaryname}</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={descStyle}>- {request.invited_at}</span>
                                    <br/>
                                    <Button variant="contained" color="primary">
                                        accept
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="outlined" color="secondary">
                                        deny
                                    </Button>

                                </div>
                            )
                        })
                }
            </div>
        );
    }
}

export default Requests;