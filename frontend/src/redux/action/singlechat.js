import axios from 'axios';
import {
    GET_CHATS,
    AFTER_POST_MESSAGE
} from '../type';
//import { CHAT_SERVER } from '../../components/config';

export const getChats=()=> async dispatch => {
    try {
        axios.defaults.withCredentials = true;
        const { data } = await axios(`/singleChat/getChats`)
        dispatch({
            type: GET_CHATS,
            payload: { chats: data }
        })
      console.log(data)
    } catch (error) {
        console.log(error)

    }
}


export function afterPostMessage(data){

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}