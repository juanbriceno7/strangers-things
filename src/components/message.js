import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMessage } from "../api";

const Message = ({postId, token, setMessaging}) => {
    const [message, setMessage] = useState("");

    const messageSubmit = async (event) => {
        event.preventDefault();
        const result = await addMessage(postId, message, token);
        if (result) {
            setMessaging(false);
            //navigate(`posts/${postId}`, { replace: true });
            //display success message?
        }
    }

    return (
        <form onSubmit={messageSubmit}>
            <input type='text' id='message' onChange={event => setMessage(event.target.value)}></input>
            <button type='submit'>SEND</button>
        </form>
    )
}

export default Message;