import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, IconButton, FormControlLabel, Checkbox, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Todo = props => {
    
    //console.log(props.todo._id);

    return(
        <TableRow>
            <TableCell>
                <FormControlLabel 
                    control={<Checkbox checked={props.todo.todo_completed} />}
                />
            </TableCell>
            <TableCell style={{ width: '120%' }} className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</TableCell>
            <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</TableCell>
            <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</TableCell>
            <TableCell align='center' padding='none'>
                <Grid container>
                    <Grid item xs={6}>
                        <IconButton component={Link} to={`/edit/${props.todo._id}`} size="small" color="inherit"><EditIcon /></IconButton>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton id={props.todo._id} onClick={props.onClick} size="small" color="secondary"><DeleteIcon id={props.todo._id} /></IconButton>
                    </Grid>
                </Grid>   
            </TableCell>
        </TableRow>
    );
}

export default Todo;