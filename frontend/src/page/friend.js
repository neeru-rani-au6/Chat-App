import React, { Component } from 'react';
import Header from '../components/header';
import { allFriends } from '../redux/action/request';
import { connect } from 'react-redux';
import { Paper, Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom';
function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
class Friends extends Component {
    state = {
        friends: null
    }
    async componentDidMount() {
        await this.props.allFriends();
        this.setState({ friends: this.props.friend.friends.friends });
    }
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
                <Header />
                <Grid container >
                    <Grid item xs={3} >
                        <Paper style={{ padding: '5px 5px 20px 5px' }}>
                            <div style={{ textAlign: "center", maxWidth: "300px" }} >
                                {this.state.friends && this.state.friends.map((item) => (
                                    <Link key={item._id} to={item.id}>
                                        <Card style={{ display: "flex", margin: "10px" }}>
                                            <Grid item xs={3} style={{ float: "left" }}>
                                                <img alt="user" src={item.photoURL || userimage} style={{ width: "40px", height: "40px", borderRadius: "50px" }} />
                                            </Grid>
                                            <Grid item xs={3} style={{ float: "right", marginTop: "10px" }}>
                                                {item.firstName + " " + item.lastName}
                                            </Grid>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} style={{ marginLeft: "80px" }}>
                        <Grid >
                            <div>
                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <IconButton edge="start" color="inherit" aria-label="menu">
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant="h6" color="inherit">
                                            Photos
                                         </Typography>
                                    </Toolbar>
                                </AppBar>
                            </div>
                            <div className="search" style={{ width: "62%" }}>
                                <TextField
                                    id="outlined-full-width"
                                    style={{ margin: 8 }}
                                    placeholder="Type a message"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    style={{ float: "left" }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        )
    }

}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        friend: state.requestReducer
    }
}

export default connect(mapStateToProps, { allFriends })(Friends);