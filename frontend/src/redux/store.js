import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer/user";
import requestReducer from './reducer/request';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({ userState: userReducer, requestReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;