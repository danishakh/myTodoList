import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Fab } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import './NotFound.css';


export default class CreateTodo extends Component {

    render() {


        return (
            <Grid container justify="center">
                
                <Grid container justify="center" style={{marginTop: 20, marginBottom:20 }} className="grid-img">
                    <Fab color='primary' variant="extended" aria-label="Back" component={Link} to="/">
                        <HomeIcon style={{marginRight:5}} />
                         Return Home
                    </Fab>
                </Grid>

                <img src="https://image.freepik.com/free-vector/funny-error-404-background-design_1167-219.jpg"></img>
            </Grid>
        )
    }
}