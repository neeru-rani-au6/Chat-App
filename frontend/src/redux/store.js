import {createStore,combineReducers,applyMiddleware} from "redux";
import userReducer from "./reducer/user";
import thunk from 'redux-thunk';
const rootReducer = combineReducers({userState:userReducer})
const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;