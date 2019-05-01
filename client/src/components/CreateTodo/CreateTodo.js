import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Icon from '@material-ui/core/Icon';


// validation functions
const required = value => (value == null ? 'Required' : undefined);

export default class CreateTodo extends Component {

    constructor(props){
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
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

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        });
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <Typography variant="h6" gutterBottom>
                    Create Todo
                </Typography>
                
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
            </div>

        )
    }
}