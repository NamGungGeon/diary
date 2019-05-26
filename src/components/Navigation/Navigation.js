import React, {Component} from 'react';
import styles from './Navigation.module.css';
import {NavLink} from "react-router-dom";
import FolderOpen from '@material-ui/icons/FolderOpen';
import AccessTime from '@material-ui/icons/AccessTime';
import Close from '@material-ui/icons/Close';
import {logout} from "../../lib/user";
import {prefix} from "../../lib/url";
import ViewList from '@material-ui/icons/ViewList';

class Navigation extends Component {
    state= {
        showMenu: false,
    }
    close= ()=>{
        this.setState({...this.state, showMenu: false});
    }
    supportMenu= ()=>{
        return (
            <div className={styles.supportMenu} style={{display: this.state.showMenu? 'inline-block': 'none'}}>
                <div style={{textAlign: 'right'}}>
                    <Close fontSize={"large"} style={{cursor: 'pointer'}} onClick={()=>{this.close()}}/>
                </div>

                <div className={styles.menus}>
                    <div className={styles.spliter}>Basic</div>
                    <NavLink className={styles.link} exact to={prefix+ '/'} onClick={()=>{this.close()}}>
                        Home
                    </NavLink>
                    <div className={styles.spliter}>Diary</div>
                    <NavLink className={styles.link} exact to={prefix+ '/dirs'} onClick={()=>{this.close()}}>
                        <FolderOpen fontSize={"small"}/>&nbsp;&nbsp;Directory List
                    </NavLink>
                    <NavLink className={styles.link} exact to={prefix+ '/timeline'} onClick={()=>{this.close()}}>
                        <AccessTime fontSize={"small"}/>&nbsp;&nbsp;Timeline
                    </NavLink>




                    <div className={styles.spliter}>About me</div>
                    <NavLink className={styles.link} exact to={prefix+ '/requests'} onClick={()=>{this.close()}}>Requests</NavLink>
                    <NavLink className={styles.link} exact to={prefix+ '/statistics'} onClick={()=>{this.close()}}>Statistics</NavLink>
                    <NavLink className={styles.link} exact to={prefix+ '/settings'} onClick={()=>{this.close()}}>Settings</NavLink>
                    <div className={styles.link} onClick={()=>{logout(); this.props.refresher();this.close();}}>Logout</div>
                </div>
            </div>);
    }
    render() {
        return (
            <div className={styles.parent}>
                <div className={styles.forPhone}>
                    <h3 style={{margin: '0.7rem'}}>
                        <ViewList fontSize={"normal"} style={{float: 'left', marginRight: '1rem', cursor: 'pointer'}}
                            onClick={()=>{this.setState({...this.state, showMenu: true})}}/>&nbsp;&nbsp;
                        <span style={{float: 'left'}}>DayDay</span>
                    </h3>
                </div>
                {this.supportMenu()}

                <div className={styles.forDesktop}>
                    <div className={styles.menus}>
                        <div className={styles.spliter}>Basic</div>
                        <NavLink className={styles.link} exact to={prefix+ '/'} onClick={()=>{this.close()}}>
                            Home
                        </NavLink>
                        <div className={styles.spliter}>Diary</div>
                        <NavLink className={styles.link} exact to={prefix+ '/dirs'} onClick={()=>{this.close()}}>
                            <FolderOpen fontSize={"small"}/>&nbsp;&nbsp;Directory List
                        </NavLink>
                        <NavLink className={styles.link} exact to={prefix+ '/timeline'} onClick={()=>{this.close()}}>
                            <AccessTime fontSize={"small"}/>&nbsp;&nbsp;Timeline
                        </NavLink>



                        <div className={styles.spliter}>About me</div>
                        <NavLink className={styles.link} exact to={prefix+ '/requests'} onClick={()=>{this.close()}}>Requests</NavLink>
                        <NavLink className={styles.link} exact to={prefix+ '/statistics'} onClick={()=>{this.close()}}>Statistics</NavLink>
                        <NavLink className={styles.link} exact to={prefix+ '/settings'} onClick={()=>{this.close()}}>Settings</NavLink>
                        <div className={styles.link} onClick={()=>{logout(); this.props.refresher(); this.close()}}>Logout</div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Navigation;