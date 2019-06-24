import React, {Component} from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import TodoList from "../../components/TodoList/TodoList";
import queryString from "query-string";
import dayday from "../../networks/dayday";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"

class TodoContainer extends Component {

    createTodo= (dir, ui, refresher)=>{
        dayday.createTodo(dir, {
            success: (data)=>{
                ui.toaster.cooking('Created todo successfully');
            },
            fail: (e)=>{

            }
        })
    };
    finishTodo= (dir, ui, refresher)=>{
        dayday.removeTodo(dir, {
            success: (data)=>{

            },
            fail: (e)=>{

            }
        })
    };

    render() {
        const {diary, uiBundle, location, refresher}= this.props;
        const query= queryString.parse(location.search);
        const {dirCode}= query;

        return (
            <div>
                <h2>To-do List</h2>
                <PlaylistAdd fontSize={"normal"} style={{cursor: 'pointer'}}
                             onMouseOver={()=>{
                                 uiBundle.tooltip.on(window.event, 'create todo');
                             }}
                             onMouseOut={()=>{
                                 uiBundle.tooltip.off();
                             }}
                             onClick={()=>{
                                 uiBundle.popup.make(
                                     (<div>
                                         <h3>Create Todo</h3>
                                         <TextField
                                             id="outlined-dense"
                                             label="Title"
                                             margin="dense"
                                             variant="outlined"
                                             helperText="Title is shown in preview"
                                             fullWidth
                                         />
                                         <br/>
                                         <TextField
                                             id="outlined-multiline-flexible"
                                             label="Description"
                                             multiline
                                             rows="7"
                                             margin="large"
                                             helperText="Describe this todo as detail"
                                             fullWidth
                                             variant="outlined"
                                         />
                                         <br/><br/>
                                         <Button variant="contained" color="secondary" fullWidth
                                            onClick={()=>{
                                                this.createTodo(dirCode, uiBundle, refresher);
                                            }}>
                                             Create
                                         </Button>
                                     </div>)
                                 );
                             }}/>&nbsp;&nbsp;
                <PlaylistAddCheck fontSize={"normal"} style={{cursor: 'pointer'}} onClick={()=>{this.finishTodo(dirCode, uiBundle, refresher)}}/>&nbsp;&nbsp;
                <TodoList uiBundle={uiBundle} todos={diary.todos}/>
            </div>
        );
    }
}

export default TodoContainer;