import React, {Component} from 'react';
import moment from "moment";
import styles from './Calendar.module.css';

class Calendar extends Component {
    days= ['Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
    getStartDays= ()=>{
        return moment(`${this.props.current}-01`,'YYYY-M-DD');
    };
    renderDays= ()=>{
        const startDays= this.getStartDays();
        const startWeekDay= startDays.isoWeekday();

        let calendar= startDays;
        const dayCells= new Array(31+ startWeekDay);
        let cnt= 0;
        for(let l=0; l< dayCells.length; l++){

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
                        this.props.getContent && this.props.getContent(value).map((v)=>{
                            return (<div className={styles.content}>{v}</div>)
                        })
                    }

                </div>);
        });
    }

    render() {
        // data is array
        // the structure of data is [{date: ..., value: ...} , ...];
        return (
            <div>
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