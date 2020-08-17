import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from '../components/header';
import { connect } from 'react-redux';
import { createGroup, findGroups, searchUser } from '../redux/action/group';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import { Card, Avatar, CardHeader, Fab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AttachmentIcon from '@material-ui/icons/Attachment';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { sendRequest } from '../redux/action/request';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import * as io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%"
    },
    root1: {
        display: 'flex',
        justifyContent: "center",
        height: "100vh",
        alignItems: "center"
    },

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Group = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openSearchDialog, setopenSearchDialog] = React.useState(false)
    const dispatch = useDispatch();
    const [state, setState] = useState({
        groupName: null,
        isSubmitting: null,
        photoURL: null,
        searchQuery: null,
        searchQueryResult: null,
        selectedGroup: null,
        snackbarOpen: false,
        snackbarMessage: "",
        snackbarSeverity: "success",
        user: props.userState.user,
        message: ""
    });
    const [messages, setMessages] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const socket = io("http://localhost:3000");

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpenSearch = () => {
        setopenSearchDialog(true);
    };
    const handleCloseSearch = () => {
        setopenSearchDialog(false);
    };

    const handleChange = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        setState({ ...state, isSubmitting: true });
        await dispatch(createGroup(state));
        setState({ ...state, isSubmitting: false });
        props.findGroups();
        setOpen(false);
    }
    const handleChangeSearch = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }
    const handleSubmitSearch = async (e) => {
        await props.searchUser({
            searchQuery: state.searchQuery
        });
        //console.log("props", props.group.searchQuery);
        setState({ ...state, searchQueryResult: props.group.searchQuery });
    };
    const sendGroupRequest = async (receiver) => {
        await props.sendRequest({
            receiver: receiver,
            groupId: state.selectedGroup._id
        });
        if (props.request.error) {
            setState({
                ...state,
                snackbarOpen: true,
                snackbarMessage: props.request.error,
                snackbarSeverity: 'error'
            })
        } else {
            setState({
                ...state,
                snackbarOpen: true,
                snackbarMessage: props.request.request.message
            })

        }
        setopenSearchDialog(false);
        setTimeout(() => {
            setState({
                ...state,
                selectedGroup: state.selectedGroup
            })
        }, 2000)
    }

    useEffect(() => {
        dispatch(findGroups());
    }, [dispatch]);

    socket.on('message', (data) => {
        setMessages(messages => messages.concat(data))
    })

    const openChatting = async (item) => {
        setState({
            ...state, selectedGroup: item
        });
        //await findChats(item._id);

        socket.emit('join', item._id);
    }



    const sendMessage = async (e) => {
        e.preventDefault();
        const message = {
            name: state.user.firstName + " " + state.user.lastName,
            photoURL: state.user.photoURL || null,
            sender: state.user.id,
            message: state.message,
            groupId: state.selectedGroup._id,
        }
        if (state.message) {
            socket.emit('message', message);
            setState({
                ...state,
                message: ""
            })
        }
        // const messages = [
        //     ...state.messages
        // ]
        // if (state.message) {
        //     messages.push(message)
        //     setState({
        //         ...state,
        //         messages,
        //         message: ""
        //     })
        // }


    }

    const showSnackbar = () => {
        return <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={state.snackbarOpen}
            onClose={() => { setState({ snackbarOpen: false }) }}
            autoHideDuration={3000}
        >
            <MuiAlert severity={state.snackbarSeverity} variant="filled">
                {state.snackbarMessage}
            </MuiAlert>
        </Snackbar>
    }
    return (
        <div style={{ marginLeft: "100px" }} >
            <Header />
            {props.group.groups ?
                <Grid container>
                    <Grid item sm={3} style={{ marginTop: "25px" }}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                            Create a New Group
      </Button>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">New Group</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To create a new group
          </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="Group name"
                                    label=" Group name"
                                    type="text"
                                    fullWidth
                                    required
                                    onChange={(e) => handleChange("groupName", e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    id="group logo"
                                    label=" Group logo"
                                    type="text"
                                    fullWidth
                                    required
                                    onChange={(e) => handleChange("photoURL", e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
          </Button>
                                <Button onClick={handleSubmit} disabled={state.isSubmitting || !(state.photoURL && state.groupName)} color="primary">
                                    Done
          </Button>
                            </DialogActions>
                        </Dialog>
                        <div className="group-list">
                            <Grid container direction="column" alignItems="flex-start">
                                {props.group.groups && props.group.groups.map((item) => (
                                    <Grid item key={item._id} style={{ margin: '10px 0' }}>
                                        <Card onClick={() => openChatting(item)} style={state.selectedGroup && state.selectedGroup._id === item._id ? { backgroundColor: '#ccc' } : { cursor: 'pointer' }}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar alt="user" src={item.photoURL || userimage} />
                                                }
                                                title={item.groupName}
                                                subheader={new Date(item.createdAt).toLocaleDateString() + ' ' + new Date(item.createdAt).toLocaleTimeString()}
                                            />
                                        </Card>

                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item sm={9} >
                        {!state.selectedGroup ?
                            <div>
                                <h1>
                                    please select a group
                            </h1>
                            </div>
                            :
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <AppBar position="relative" style={{ background: "#37474f" }}>
                                    <Toolbar>
                                        <Typography className={classes.title} variant="h6" noWrap>
                                            <CardHeader
                                                avatar={
                                                    <Avatar alt="user" src={state.selectedGroup.photoURL || userimage} />
                                                }
                                                title={state.selectedGroup.groupName}
                                            />
                                        </Typography>
                                        <div >
                                            <Tooltip title="Share documents" aria-label="add">
                                                <Fab size="small" style={{ marginRight: "8px" }}>
                                                    <AttachmentIcon />
                                                </Fab>
                                            </Tooltip>
                                            {state.user.id === state.selectedGroup.owner &&
                                                <Tooltip title="Add member" aria-label="add">
                                                    <Fab size="small" onClick={handleClickOpenSearch}>
                                                        <PersonAddIcon />
                                                    </Fab>
                                                </Tooltip>
                                            }
                                            <Dialog open={openSearchDialog} onClose={handleCloseSearch} aria-labelledby="form-dialog-title">
                                                <DialogTitle id="form-dialog-title">Search User</DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="search"
                                                        label="Search"
                                                        type="text"
                                                        fullWidth
                                                        onChange={(e) => handleChangeSearch("searchQuery", e.target.value)}
                                                    />
                                                </DialogContent>
                                                <DialogActions>
                                                    <Grid style={{ margin: '10px 0' }} container direction="column">
                                                        {state.searchQueryResult && state.searchQueryResult.map((item) => (
                                                            <Grid item key={item._id}>
                                                                <Card onClick={() => sendGroupRequest(item._id)}>
                                                                    <CardHeader
                                                                        avatar={
                                                                            <Avatar alt="user" src={item.photoURL || userimage} />
                                                                        }
                                                                        title={item.firstName + " " + item.lastName}
                                                                    />
                                                                </Card>
                                                            </Grid>
                                                        ))}
                                                    </Grid>

                                                </DialogActions>
                                                <DialogActions>
                                                    <Button onClick={handleCloseSearch} color="primary">
                                                        Cancel
                                            </Button>
                                                    <Button onClick={handleSubmitSearch} color="primary">
                                                        Search
                                            </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                                <div className="chat-box">
                                    <Grid className="messages">
                                        {messages && messages.map(item => (
                                            <Grid item xs={12} key={item._id} style={{ padding: '8px' }}>
                                                <div className="message">
                                                    <Avatar className="message-photo" src={item.phtoURL || userimage} alt="message" />
                                                    <div className="message-name">{item.name}</div>
                                                </div>
                                                <div className="message-content">{item.message}</div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <form className="message-form" onSubmit={sendMessage}>
                                        <Grid container>
                                            <Grid item xs={10} sm={11}>
                                                <TextField
                                                    fullWidth
                                                    name="message"
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    size="small"
                                                    value={state.message}
                                                    onChange={(e) => setState({ ...state, message: e.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={1}>
                                                <Fab type="submit">Send</Fab>

                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                            </div>
                        }
                    </Grid>

                </Grid>
                : <div className={classes.root1}>
                    <CircularProgress />
                </div>
            }
            {showSnackbar()}
        </div >
    );
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        userState: state.userState,
        group: state.groupReducer,
        request: state.requestReducer
    }
}

export default connect(mapStateToProps, { createGroup, findGroups, searchUser, sendRequest })(Group);
