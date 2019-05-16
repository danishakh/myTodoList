import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const FormButton = props => {
    const { classes } = props;

    return(
        <Button 
            variant={props.variant}
            type={props.type} 
            color={props.color} 
            className={classes.button}
            onClick={props.onClick}
        >
            {props.buttonName}
        </Button>
    );
}

export default withStyles(styles)(FormButton);