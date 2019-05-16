import React from 'react';
import { Link } from 'react-router-dom';
import { TableRow, TableCell, IconButton, FormControlLabel, Checkbox } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const Todo = props => (

    <TableRow>
        <TableCell>
            <FormControlLabel 
                control={<Checkbox checked={props.todo.todo_completed}/>}
            />
        </TableCell>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</TableCell>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</TableCell>
        <TableCell className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</TableCell>
        <TableCell>
            <IconButton component={Link} to={`/edit/${props.todo._id}`} size="small" color="inherit"><EditIcon /></IconButton>
        </TableCell>
    </TableRow>
);

export default Todo;