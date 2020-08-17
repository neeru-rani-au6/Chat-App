import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from '../type';
 
const singleChatReducer=(state ={} ,action)=>{
    switch(action.type){
        case GET_CHATS:
            return {...state, chats: action.payload }
        case AFTER_POST_MESSAGE:
                return {...state, chats: action.payload }
                console.log(state)
        default:
            return state;
    }
}

export default singleChatReducer;