import React, { useState } from 'react';
import Header from '../components/header';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/action/user';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const user = useSelector(state => state.userState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    userId: props?.user.id,
    token: props?.user.token,
    firstName: props?.user.firstName,
    lastName: props?.user.lastName,
    email: props?.user.email,
    isSubmitting: false,
    photoURL: null

  });
  const handleChange = (key, value) => {
    const newState = { ...state };
    newState[key] = value;
    setState(newState);
  }
  const handleSubmit = async (e) => {
    console.log(state.photoURL)
    e.preventDefault();
    if (!state.photoURL) {
      return
    }
    const newState = { ...state };
    newState.isSubmitting = true;
    setState(newState);
    await dispatch(updateUser(state));
    newState.isSubmitting = false;
    newState.photoURL = null;
    setState(newState);
    if (!user.error) {
      history.push('/profile');
    }
  }
  const removeImage = async (e) => {
    e.preventDefault();
    const newState = { ...state };
    newState.isSubmitting = true;
    setState(newState);
    await dispatch(updateUser(state));
    newState.isSubmitting = false;
    newState.photoURL = null;
    setState(newState);
    if (!user.error) {
      history.push('/profile');
    }
  }
  return props.user && (
    <div>
      <Header />
      <main className="backgrnd" style={{ marginLeft: "100px", textAlign: "center", marginTop: "50px " }} >
        <div style={{ marginBottom: "40px" }}>
          {state.photoURL ? <img src={URL.createObjectURL(state.photoURL)} style={{ borderRadius: "50%", width: "200px", height: "200px" }} alt={props.user.firstName} />
            : props?.user?.photoURL ? <img src={props.user.photoURL} style={{ borderRadius: "50%", width: "200px", height: "200px" }} alt={props.user.firstName} />
              : <span style={{ background: "gray", borderRadius: "50%", width: "50%", height: "50%", padding: "40px", color: "#000", fontSize: "50px", textTransform: "uppercase" }}>
                {props.user.firstName[0]}{props.user.lastName[0]}
              </span>
          }
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <form onSubmit={handleSubmit} noValidate>
            <Grid>
              <input accept="image/*"
                id="icon-button-file"
                type="file"
                className={classes.input}
                onChange={(e) => handleChange("photoURL", e.target.files[0])} />
              <label htmlFor="icon-button-file">
                <Tooltip title="Upload Photo">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>
              <Tooltip title="Remove Photo">
                <IconButton color="secondary" aria-label="upload picture" component="span" disabled={state.isSubmitting}
                  onClick={removeImage}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={state.isSubmitting}
            >
              Update Photo
          </Button>
          </form>
          {/* <Grid>
            <IconButton color="primary" aria-label="upload picture" component="span" disabled={state.isSubmitting}
              onClick={removeImage}>
              <DeleteIcon />
            </IconButton>
          </Grid> */}

        </Container>
        <h3>
          Name: {props.user.firstName + " " + props.user.lastName}
        </h3>
        <h3>
          Email: {props.user.email}
        </h3>
      </main>
      <Backdrop className={classes.backdrop} open={state.isSubmitting} >
        <CircularProgress color="inherit" />
      </Backdrop>
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