import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/action/user';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Ouricon from '../assets/images/ouricon.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    background: '#fff',
    boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    marginBottom: "20px"
  },
}));

export default function Register() {
  const classes = useStyles();
  const user = useSelector(state => state.userState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    isSubmitting: false
  });
  const handleChange = (key, value) => {
    const newState = { ...state };
    newState[key] = value;
    if (key === 'firstName') {
      newState.firstNameError = "";
      if (!newState.firstName.match(/^[a-z ,.'-]{3,150}$/i)) {
        newState.firstNameError = "firstName is not valid"
      }
      if (newState.firstName.trim() === "") {
        newState.firstNameError = "First name is required"
      }
    }
    if (key === 'lastName') {
      newState.lastNameError = "";
      if (!newState.lastName.match(/^[a-z ,.'-]{3,150}$/i)) {
        newState.lastNameError = "lastName is not valid"
      }
      if (newState.lastName.trim() === "") {
        newState.lastNameError = "Last name is required"
      }
    }
    if (key === 'email') {
      newState.emailError = "";
      if (!newState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        newState.emailError = "invalid email "
      }
      if (newState.email.trim() === "") {
        newState.emailError = "email is required"
      }
    }
    if (key === "password") {
      newState.passwordError = "";
      if (newState.password.length < 5) {
        newState.passwordError = "Can not be less than 5"
      }
      if (newState.password.trim() === "") {
        newState.passwordError = "password is required"
      }
    }
    setState(newState);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newState = { ...state };
    if (newState.firstName.trim() === "" || newState.firstNameError) {
      newState.firstNameError = newState.firstNameError || "first name is required"
      setState(newState)
      return
    }
    if (newState.lastName.trim() === "" || newState.lastNameError) {
      newState.lastNameError = newState.lastNameError || "last name is required"
      setState(newState);
      return
    }
    if (newState.email.trim() === "" || newState.emailError) {
      newState.emailError = newState.emailError || "email is required"
      setState(newState);
      return
    }
    if (newState.password.trim() === "" || newState.passwordError) {
      newState.passwordError = newState.passwordError || "password is required"
      setState(newState);
      return
    }

    newState.isSubmitting = true;
    setState(newState);
    await dispatch(registerUser(state));
    newState.isSubmitting = true;
    setState(newState);
    if (!user.error) {
      history.push('/login');
    }
  }
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          <img src={Ouricon} alt="user" style={{ width: "100%" }} />
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid>
            <input accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={(e) => handleChange("photoURL", e.target.files[0])} />
            <label htmlFor="icon-button-file">
              {/* <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton> */}
            </label>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={state.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={!!state.firstNameError}
                helperText={state.firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={state.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={!!state.lastNameError}
                helperText={state.lastNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!state.emailError}
                helperText={state.emailError}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={!!state.passwordError}
                helperText={state.passwordError}
              />
            </Grid>
            {user.error &&
              <Grid item xs={12}>
                <div className="error">{user.error}</div>
              </Grid>
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={state.isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justify="center" className="mt-2">
            <Grid item>
              Already have an account?
              <Link href="/#/login" variant="body2">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}