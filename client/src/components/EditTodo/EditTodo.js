import React, { Component } from 'react';
import axios from 'axios';
import { Checkbox, Grid, Typography, FormControlLabel, TextField, Radio, Button } from '@material-ui/core';
import {Redirect} from 'react-router-dom';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount(){
        this.getCurrentTodoItem();
    }

    getCurrentTodoItem() {
        axios.get(`http://localhost:3001/api/todos/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_responsible: res.data.todo_responsible,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed,
                    redirect: false
                })
            })
            .catch(function (err){
                console.log(err)
            }); 
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
        const updatedTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        // Post the newTodo object to the backend
        axios.post(`http://localhost:3001/api/todos/${this.props.match.params.id}`, updatedTodo)
            .then(res => {
                console.log(res.data);

                // Set redirect to true so we can go back to main page
                this.setState({redirect: true});
            })

        // Send the user back to main page - UPDATE: this did not update the UI in the main page
        // this.props.history.push('/');
    }

    onCancelHandler(e) {
        this.setState({redirect: true});
    }

    render() {

        if (this.state.redirect)
        return <Redirect to="/" />

        return (
            <Grid container justify="center">
                
                <Grid container justify="center" style={{marginTop: 20}}>
                    <Typography variant="h4" gutterBottom>
                        Edit Todo
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
                                        control={<Radio checked={this.state.todo_priority==='low'} value='low' onChange={(e)=>this.setState({todo_priority: "low"})}/>} 
                                        label="Low" />
                                    <FormControlLabel 
                                        control={<Radio checked={this.state.todo_priority==='medium'} value='medium' onChange={(e)=>this.setState({todo_priority: "medium"})}/>} 
                                        label="Medium" />
                                    <FormControlLabel 
                                        control={<Radio checked={this.state.todo_priority==='high'} value='high' onChange={(e)=>this.setState({todo_priority: "high"})} />} 
                                        label="High" />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel 
                                    control={<Checkbox checked={this.state.todo_completed} onChange={(e)=>this.setState({todo_completed: !(this.state.todo_completed)})} />}
                                    label="Completed"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Button variant="contained" color="primary" type="submit">
                                    Update
                                </Button>}
                                />

                                <FormControlLabel
                                    control={<Button variant="contained" color="default" onClick={this.onCancelHandler}>
                                    Cancel
                                </Button>}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        )
    }
}