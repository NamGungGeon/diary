import React, {Component} from 'react';
import styles from './Navigation.module.css';
import {NavLink} from "react-router-dom";
import FolderOpen from '@material-ui/icons/FolderOpen';
import Create from '@material-ui/icons/Create';
import AccessTime from '@material-ui/icons/AccessTime';
import {logout} from "../../lib/user";
import {prefix} from "../../lib/url";

class Navigation extends Component {
    render() {
        return (
            <div className={styles.parent}>
                <div className={styles.profile}>
                    DayDay
                </div>

                <div className={styles.menus}>
                    <div className={styles.spliter}>Basic</div>
                    <NavLink className={styles.link} exact to={prefix+ '/'}>
                        Home
                    </NavLink>
                    <div className={styles.spliter}>Diary</div>
                    <NavLink className={styles.link} exact to={prefix+ '/dirs'}>
                        <FolderOpen fontSize={"small"}/>&nbsp;&nbsp;Directory List
                    </NavLink>
                    <NavLink className={styles.link} exact to={prefix+ '/write'}>
                        <Create fontSize={"small"}/>&nbsp;&nbsp;Write
                    </NavLink>
                    <NavLink className={styles.link} exact to={prefix+ '/timeline'}>
                        <AccessTime fontSize={"small"}/>&nbsp;&nbsp;Timeline
                    </NavLink>



                    <div className={styles.spliter}>About me</div>
                    <NavLink className={styles.link} exact to={'/requests'}>Requests</NavLink>
                    <div className={styles.link}>Statistics</div>
                    <div className={styles.link}>Settings</div>
                    <div className={styles.link} onClick={()=>{logout(); this.props.refresher();}}>Logout</div>
                </div>
            </div>
        );
    }
}

export default Navigation;