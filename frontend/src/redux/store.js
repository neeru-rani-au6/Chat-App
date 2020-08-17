import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer/user";
import requestReducer from './reducer/request';
import singleChatReducer from './reducer/singleChat';
import thunk from 'redux-thunk';
import groupReducer from './reducer/group';
const rootReducer = combineReducers({ userState: userReducer,
     requestReducer, 
     groupReducer,
     singleChatReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;