import React, {Component} from 'react';
import Delete from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';

class Read extends Component {

    moveCorrect= ()=>{
        this.props.history.push(this.props.match.url+ '/correct');
    }
    render() {
        return (
            <div>
                <h1>Title</h1>
                <div style={{textAlign: 'left'}}>
                    <Create fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.moveCorrect}/>&nbsp;&nbsp;
                    <Delete fontSize={"normal"} style={{cursor: 'pointer'}} onClick={this.openDelete}/>&nbsp;&nbsp;
                </div>
                <br/>

                <div style={{
                    fontSize: '0.8rem',
                    color: '#777777'
                }}>
                    Created at: 2019-05-21
                    <br/>
                    Owner: fasdfsaf
                    <br/>
                    Diary type: private
                    <br/>
                    Data Cnt: 2
                </div>
                <br/>
                <div>
                    내용물
                </div>
            </div>
        );
    }
}

export default Read;