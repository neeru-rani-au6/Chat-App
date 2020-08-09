import React, { Component } from "react";
import Login from './components/login';
import Register from './components/register';
import forgotPassword from './components/forgotPassword';
import Home from './page/home';
//import Header from './components/header';
import Profile from './page/profile';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route path="/" component={Login} exact />
                    <Route path="/register" component={Register} exact />
                    <Route path="/forgotPassword" component={forgotPassword} exact />
                    <Route path="/home" component={Home} exact />
                    <Route path="/Profile" component={Profile} exact />
                </BrowserRouter>
            </div>
        )
    }
}

export default App;