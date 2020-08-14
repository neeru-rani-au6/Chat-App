import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from '../components/header';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Groups = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ marginLeft: "100px" }}>
            <Header />
            <Grid item xs={4}>
                <Paper className={classes.paper}>xs=6</Paper>
            </Grid>
        </div>
    );
}

export default Groups;