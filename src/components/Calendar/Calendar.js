import React, {Component} from 'react';
import moment from "moment";
import styles from './Calendar.module.css';
import PropTypes from 'prop-types';
import {getCurrentMonth, getCurrentYear} from "../../lib/dateUtil";
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

class Calendar extends Component {
    static defaultProps= {
        getContent: ()=>{},
        current: `${getCurrentYear()-getCurrentMonth()}`,
        updateDate: (date)=>{},
    };
    static propTypes= {
        getContent: PropTypes.func,
        updateDate: PropTypes.func,
        current: PropTypes.string,
    };


    state= {
        standardDate: moment(`${this.props.current}-01`,'YYYY-M-D')
    };

    days= ['Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
    renderDays= ()=>{
        const startDays= this.state.standardDate;
        const startWeekDay= startDays.isoWeekday();

        let calendar= startDays.clone();
        const dayCells= new Array(31+ startWeekDay);
        let cnt= 0;
        for(let l=0; l< dayCells.length; l++){
            if(parseInt(startDays.format('M')) !== parseInt(calendar.format('M')))
                break;

            if(cnt< startWeekDay-1){
                //disabled cell
                dayCells[l]= null
            }else{
                //enabled cell
                dayCells[l]= calendar.format('YYYY-MM-DD');
                calendar= calendar.add(1, 'days');
            }
            cnt++;
        }
        return dayCells.map((value)=>{
            // console.log(value);
            // console.log(this.props.getContent(value));
            return value===null?
                (<div className={styles.disabled}></div>)
                :
                (<div className={styles.cell}
                >
                    <div className={styles.date}>
                        {moment(value).format("M / D")}
                    </div>
                    {
                        this.props.getContent(value).map((v)=>{
                            return (<div className={styles.content}>{v}</div>)
                        })
                    }

                </div>);
        });
    }

    moveMonth= (isAdd)=>{
        this.setState({
            ...this.state,
            standardDate: this.state.standardDate.subtract(isAdd? -1: 1, 'months'),
        });
        this.props.updateDate(this.state.standardDate);
    }

    render() {
        // data is array
        // the structure of data is [{date: ..., value: ...} , ...];
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>
                    <NavigateBefore fontSize={"large"} className={styles.arrow} style={{cursor: 'pointer', float: 'left'}} onClick={()=>{this.moveMonth(false)}}/>
                    <NavigateNext fontSize={"large"}  className={styles.arrow} style={{cursor: 'pointer', float: 'right'}} onClick={()=>{this.moveMonth(true)}}/>
                    {this.state.standardDate.format('MM/YYYY')}
                </h3>
                <div className={styles.calendar}>
                    {
                        this.days.map((value)=>{
                            return (<div className={styles.headerCell} >{value}</div>);
                        })
                    }
                    {this.renderDays()}
                </div>
            </div>
        );
    }
}

export default Calendar;