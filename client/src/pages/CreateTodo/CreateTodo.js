import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, TextField, FormControlLabel, Button, Radio, Fab } from '@material-ui/core';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Redirect } from 'react-router-dom';


export default class CreateTodo extends Component {

    constructor(props){
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            redirect: false
        }
    }

    onChangeHandler(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
        //console.log(e.target.id);
        //console.log(e.target.value);
    }

    onSubmitHandler(e) {

        e.preventDefault();
        // console.log(`Form submitted!`);
        // console.log(`Todo Description: ${this.state.todo_description}`);
        // console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        // console.log(`Todo Priority: ${this.state.todo_priority}`);
        
        // Create a newTodo object based off the state (which is tied to the text inputs)
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        // Post the newTodo object to the backend
        axios.post('/api/todos', newTodo)
            .then(res => {
                // console.log(res.data)
                
                // Clear state and Redirect to Home
                this.setState({
                    todo_description: '',
                    todo_responsible: '',
                    todo_priority: '',
                    todo_completed: false,
                    redirect:true
                })
            });

    }

    render() {

        if (this.state.redirect)
        return <Redirect to="/" />


        return (
            <Grid container justify="center">

                <Grid item sm={8} style={{marginTop: 50}}>
                    <Fab color='default' variant="extended" aria-label="Back" component={Link} to="/">
                        <BackIcon />
                        Back
                    </Fab>
                </Grid>
                
                <Grid container justify="center" style={{marginTop: 20}}>
                    <Typography variant="h4" gutterBottom>
                        Create New Todo
                    </Typography>
                </Grid>

                <Grid container justify="center">
                    <form onSubmit={this.onSubmitHandler}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField
                                    id="todo_description"
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    value={this.state.todo_description}
                                    onChange={this.onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="todo_responsible"
                                    name="responsible"
                                    label="Responsible"
                                    fullWidth
                                    value={this.state.todo_responsible}
                                    onChange={this.onChangeHandler}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Radio checked={this.state.todo_priority==='low'} onChange={(e)=>this.setState({todo_priority: "low"})}/>} 
                                        label="Low" />
                                    <FormControlLabel 
                                        control={<Radio checked={this.state.todo_priority==='medium'} onChange={(e)=>this.setState({todo_priority: "medium"})}/>} 
                                        label="Medium" />
                                    <FormControlLabel 
                                        control={<Radio checked={this.state.todo_priority==='high'} onChange={(e)=>this.setState({todo_priority: "high"})} />} 
                                        label="High" />
                            </Grid>

                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        )
    }
}