import React, { Component } from 'react';
import Header from '../components/header';
import { connect } from 'react-redux';
import { allUser } from '../redux/action/user';
//import Box from '@material-ui/core/Box';
class Home extends Component {
    state = {
        users : null
    }
    async componentDidMount() {
        await this.props.allUser();
        this.setState({
            users: this.props.userState.users
        })
    }
    render() {

        return (
            <div style={{ marginLeft: "100px" }}>
                <Header />
                <div >
                    {this.state.users && this.state.users.map((item) => (
                        <main key={item._id}>
                            <h1> {item.firstName + " " + item.lastName}</h1>
                        </main>

                    ))}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
}

export default connect(mapStateToProps, { allUser })(Home);