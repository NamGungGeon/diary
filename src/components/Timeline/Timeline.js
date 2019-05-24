import React, {Component} from 'react';
import styles from './Timeline.module.css'
import {user} from "../../lib/user";

class Timeline extends Component {

    render() {
        const {data}= this.props;
        return (
            <div className={styles.wrapper}>
                {
                    data.map((value)=>{
                        const className= value.auth=== user.uid? styles.me: styles.other;
                        return (<div className={className}>
                            <h5>{value.auth===user.uid? 'I': value.auth} wrote diary to {value.diaryTitle} at {value.date}</h5>
                            {value.content.length>200? value.content.slice(0, 190)+ '...': value.content}
                        </div>)
                    })
                }
            </div>
        );
    }
}

export default Timeline;