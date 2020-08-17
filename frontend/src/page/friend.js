import React, { Component } from 'react';
import Header from '../components/header';
import { allFriends } from '../redux/action/request';
import { connect } from 'react-redux';
import { Paper, Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import TextField from '@material-ui/core/TextField';
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

                                    <Card key={item._id} style={{ display: "flex", margin: "10px" }}>
                                        <Grid item xs={3} style={{ float: "left" }}>
                                            <img alt="user" src={item.photoURL || userimage} style={{ width: "40px", height: "40px", borderRadius: "50px" }} />
                                        </Grid>
                                        <Grid item xs={3} style={{ float: "right", marginTop: "10px" }}>
                                            {item.firstName + " " + item.lastName}
                                        </Grid>
                                    </Card>

                                ))}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} style={{ marginLeft: "80px" }}>
                        <Grid >
                            <div>
                            </div>
                            <div className="search" style={{ width: "62%" }}>
                                <TextField
                                    id="outlined-full-width"
                                    placeholder="Type a message"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    style={{ float: "left", margin: 8 }}
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