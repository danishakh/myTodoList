import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Todo from '../../components/Todo';


export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.state = {todos:[]};
    }

    componentDidMount() {
        // NOTE TO SELF: having the loadCurrentTodoList() function defined inside componentDidMount() caused issues
        // when reloading the page. Data would not load due to XHR 'Network Error'. Always better to have a separate
        // function defined outside and then call it inside componentDidMount().
        this.loadCurrentTodoList();
    }

    // Get all todos from backend
    loadCurrentTodoList = () => {
        axios.get('http://localhost:3001/api/todos')
            .then(res => {
                this.setState({todos: res.data});
            })
            .catch(function(err){
                console.log(err);
            })
    }

    // Remove Todo Item if Delete button is clicked in 'Todo' component
    // Input 'id' received from child 'Todo' component
    onDeleteClick(id) {
        // console.log(id);
        axios.delete(`http://localhost:3001/api/todos/${id}`)
            .then(res => {
                this.setState({
                    todos: this.state.todos.filter(todo => {
                        return todo._id !== id
                    })
                })
            })
    }
    

    todoListRow() {
        // Map through todos array in state and create a Todo item
        return this.state.todos.map((currentTodo, i) => {
            return <Todo 
                        todo={currentTodo} 
                        key={i}
                        onClick={this.onDeleteClick}
                    />;
        });
    }

    render() {
        return (
            <Grid container justify="center">

                

                <Grid sm={8} item style={{marginTop: 50}}>
                    <Paper md={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Completed</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Responsible</TableCell>
                                    <TableCell>Priority</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this.todoListRow() }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

            </Grid>
        )
    }
}