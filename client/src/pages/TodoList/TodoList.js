import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Todo from '../../components/Todo';



export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onCompletedClick = this.onCompletedClick.bind(this);
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

                    // Filter out the todo which has the 'id' we want to delete
                    todos: this.state.todos.filter(todo => {
                        return todo._id !== id
                    })
                });
            })
    }

    // Function to update TodoItem's 'completed' state from TodoList table
    // Input 'id' received from child 'Todo' component
    onCompletedClick(todo) {
        //console.log(todo);

        const updatedTodo = {
            todo_completed: !todo.todo_completed
        }

        axios.post(`http://localhost:3001/api/todos/${todo._id}`, updatedTodo)
            .then(res => {
                //console.log(res.data);

                // Fetch the updated data and re-mount component
                this.loadCurrentTodoList();
            })
    }
    

    todoListRow() {
        // Map through todos array in state and create a Todo item
        return this.state.todos.map((currentTodo, i) => {
            return <Todo 
                        todo={currentTodo} 
                        key={i}
                        onDelete={this.onDeleteClick}
                        onCheck={this.onCompletedClick}
                    />;
        });
    }

    render() {
        return (
            <Grid container justify="center">

                <Grid item sm={8} style={{marginTop: 50}}>
                    <Fab color='primary' variant="extended" aria-label="Create New Todo" component={Link} to="/create">
                        <AddIcon />
                        New Todo
                    </Fab>
                </Grid>

                <Grid sm={8} item style={{marginTop: 20}}>
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