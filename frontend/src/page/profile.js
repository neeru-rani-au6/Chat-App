import React from 'react';
import Header from '../components/header';
import { connect } from 'react-redux';
const Profile = (props) => {

    return props.user && (
        <div>
            <Header />
            <main style={{ marginLeft: "100px", textAlign: "center" }} >
                <div style={{ marginBottom: "40px" }}>
                    {props.user && props.user.photoURL ? <img src={props.user.photoURL} style={{ borderRadius: "50%", width: "50%", height: "50%" }} alt={props.user.firstName} />
                        : <span style={{ background: "gray", borderRadius: "50%", width: "50%", height: "50%", padding: "40px", color: "#000", fontSize: "50px", textTransform: "uppercase" }}>
                            {props.user.firstName[0]}{props.user.lastName[0]}
                        </span>
                    }
                </div>
                <h3>
                    Name: {props.user.firstName + " " + props.user.lastName}
                </h3>
                <h3>
                    Email: {props.user.email}
                </h3>
            </main>

        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log("pro", state)
    return {
        user: state.userState.user,
        isAuth: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Profile);