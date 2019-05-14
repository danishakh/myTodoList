import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Todo from '../Todo';


export default class TodoList extends Component {

    constructor(props) {
        super(props);
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

    todoListRow() {
        // Map through todos array in state and create a Todo item
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() {
        return (
            <Grid container justify="center">

                <Grid container justify="center" style={{marginTop: 20}}>
                    <Typography variant="h4" gutterBottom>
                        Todo List
                    </Typography>
                </Grid>

                <Grid sm={6} item>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
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