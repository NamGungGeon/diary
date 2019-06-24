import React, {Component} from 'react';
import {user} from "../../lib/user";
import styles from './TodoList.module.css';
import Remove from '@material-ui/icons/Remove';
import Button from "@material-ui/core/Button"
import Create from "../../pages/Diary";
import dayday from "../../networks/dayday";

class TodoList extends Component {

    state={
    };

    clickedTodo= (todo)=>{
        this.props.uiBundle.popup.make(
            (<div>
                <h2>
                    {todo.content}
                    <p className={styles.desc}>{todo.creator}</p>
                </h2>

                <h5>detail description</h5>
                <Button variant="contained" color="primary"
                        onClick={()=>{this.removeTodo(todo)}}>
                    finish (remove)
                </Button>
                &nbsp;
                <Button variant="contained" color="secondary"
                        onClick={()=>{this.removeTodo(todo)}}>
                    change
                </Button>
            </div>)
        );
    };

    removeTodo= (todo)=>{

    }

    render() {
        const {todos}= this.props;
        return (
            <div>
                {
                    todos &&
                    todos.map((todo)=>{
                        return (<p className={styles.todos} onClick={()=>{this.clickedTodo(todo)}}>
                            <span className={styles.todo} >{todo.content}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span className={styles.desc}>-{todo.creator=== user.uid? 'me': todo.creator}</span>
                        </p>);
                    })
                }
            </div>
        );
    }
}

export default TodoList;