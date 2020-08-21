import React ,{useState} from 'react';
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
const Profile = (props) => {
    const user = useSelector(state => state.userState);
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        userId:props.user.id,
        token:props.user.token,
        firstName:props.user.firstName,
        lastName:props.user.lastName,
        email:props.user.email,
        isSubmitting: false,
        
      });
      const handleChange = (key, value) => {
        const newState = { ...state };
        newState[key] = value;
        setState(newState);
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newState = { ...state };
        newState.isSubmitting = true;
        setState(newState);
        await dispatch(updateUser(state));
        newState.isSubmitting =false;
        setState(newState);
        if (!user.error) {
          history.push('/profile');
        }
      }
    return props.user && (
        <div>
            <Header />
            <main  className="backgrnd" style={{ marginLeft: "100px", textAlign: "center" ,marginTop:"50px "}} >
                <div style={{ marginBottom: "40px" }}>
                    {props.user && props.user.photoURL ? <img src={props.user.photoURL} style={{ borderRadius: "50%", width: "50%", height: "50%" }} alt={props.user.firstName} />
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
                onChange={(e) => handleChange("photoURL", e.target.files[0])} />
               <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={state.isSubmitting}
          >
            Update Photo
          </Button>
          </form>
          </Container>
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