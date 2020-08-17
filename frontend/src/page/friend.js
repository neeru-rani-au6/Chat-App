import React, { Component } from 'react';
import Header from '../components/header';
import { getChats, afterPostMessage } from "../redux/action/singlechat";
import { allFriends } from '../redux/action/request';
import { connect } from 'react-redux';
import { Paper, Card,Fab } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import userimage from '../assets/images/user.jpg';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Button1 from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Axios from 'axios';
//added by veda
import { Form, Input, Button, Row, Col, } from 'antd';
import Icon from '@ant-design/icons';
import io from "socket.io-client";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
//import ChatCard from "../components/ChatCard";
import Dropzone from "react-dropzone";


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
        friends: null,
        chatMessage: "",
        selectFriend:null
    }
    
    
    async componentDidMount() {
        console.log(this.props);
       
       // console.log("userrrr",this.props.user.user.firstName)
        await this.props.allFriends();
        console.log("chats",this.props);
        this.setState({ friends: this.props.friend.friends.friends });
        console.log(this.props);
        let server = "http://localhost:5000";

        this.props.getChats();
        console.log(this.props.chats)
        this.socket = io(server);
        console.log(this.socket.id);
        
        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log( "MESSAGE FROM BD",messageFromBackEnd)
            
            this.props.afterPostMessage(messageFromBackEnd)
            console.log( "MESSAGE FROM BD",messageFromBackEnd)
        })

    }
    componentDidUpdate() {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }
    renderCards = () =>{
        console.log("inside renderrrr",this.props.chats)
        this.props.chats.chats
        && this.props.chats.chats.chats.map((chat) => (
            {/*<ChatCard  key={chat._id}  {...chat} />*/}
        ));
    }
    handleFrndChat=async(item)=>{
        console.log(item)
        await this.setState({
           selectFriend:item
           
        })
        console.log(this.selectFriend);

    }
        
        onDrop = (files) => {
            console.log("files",files)
    
    
            if (this.props.user.user && !this.props.user.isAuthenticated) {
                return alert('Please Log in first');
            }
            let formData = new FormData;

            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
    
            formData.append("file", files[0])
    
            Axios.post('api/chat/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {
                        let chatMessage = response.data.url;
                        let userId = this.props.user.user._id
                        let userName = this.props.user.user.firstName;
                        let userImage = this.props.user.user.photoURL;
                        let nowTime = moment();
                        let type = "VideoOrImage"
    
                        this.socket.emit("Input Chat Message", {
                            chatMessage,
                            userId,
                            userName,
                            userImage,
                            nowTime,
                            type
                        });
                    }
                })
        }
        submitChatMessage = (e) => {
            e.preventDefault();
    
            if (this.props.user.user && !this.props.user.isAuthenticated) {
                return alert('Please Log in first');
            }
           let chatMessage = this.state.chatMessage
            //let userId = this.props.user.id
            console.log(chatMessage);
            let userName = this.props.user.user.firstName;
            console.log(userName)
            let userImage = this.props.user.user.photoURL;
            let nowTime = moment();
            let type = "Text"
    
            this.socket.emit("Input Chat Message", {
                chatMessage,
                userName,
                userImage,
                nowTime,
                type
            });
            this.setState({ chatMessage: "" })
        }
      
           
    render() {
        return (
            <div style={{ marginLeft: "100px" }}>
               <Header />
                <Grid container >
                    <Grid item sm={3} >
                        <Paper style={{ padding: '5px 5px 20px 5px' }}>
                            <div style={{ textAlign: "center", maxWidth: "300px" }} >
                                {this.state.friends && this.state.friends.map((item) => (
                                    <Card key={item._id} style={{ display: "flex", margin: "10px" }}>
                                        <Grid item xs={3} style={{ float: "left" }}>
                                            <img alt="user" src={item.photoURL || userimage} style={{ width: "40px", height: "40px", borderRadius: "50px" }} />
                                        </Grid>

                                        <Grid item xs={3} style={{ float: "right", marginTop: "10px" }}>
                                            {item.firstName + " " + item.lastName}
                                        <Button variant="outlined" color="primary" onClick={()=>this.handleFrndChat(item)} style={this.state.selectFriend &&this.state.selectFriend._id === item._id ? { backgroundColor: '#ccc' } : { cursor: 'pointer' }}  >Chat </Button>

                                        </Grid>
                                    </Card> 
                                ))}
                            </div>
                        </Paper>
                    </Grid>
                

            <Grid  item sm={9}>
               <AppBar position="static">
               <Toolbar>
                 <IconButton edge="start"  color="inherit" aria-label="menu">
                </IconButton>
               <Typography variant="h6" >
                 Chats
               </Typography>
         
        </Toolbar>
      </AppBar>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>
                    <form className="message-form" onSubmit={this.submitChatMessage}>
                                        <Grid container>
                                            <Grid item xs={10} sm={11}>
                                                <TextField
                                                    fullWidth
                                                    name="message"
                                                    variant="outlined"
                                                    autoComplete="off"
                                                    size="small"
                                                    value={this.state.message}
                                                    onChange={(e) =>this.setState({ ...this.state, message: e.target.value })}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sm={1}>
                                                <Fab type="submit">Send</Fab>

                                            </Grid>
                                        </Grid>
                                    </form>
                  {/* <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={6}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload" />
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>

                            <Col span={8}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                   send message <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                    */ } 
                    </div>
            </Grid>
            
            </Grid> 
            </div>
           )
    }

}
const mapDispatchToProps = (dispatch) => {
    console.log("dispatch",dispatch)
}

const mapStateToProps = (state) => {
    console.log("state11",state)
    console.log("chat",state.chatReducer)
    return {
        friend: state.requestReducer,
        user: state.userState,
        chats: state.singleChatReducer
    }
}

export default connect(mapStateToProps, { getChats, afterPostMessage,allFriends })(Friends);