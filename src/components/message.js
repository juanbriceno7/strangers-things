import { useState } from "react";
import { addMessage, fetchUserInfo } from "../api";

const Message = ({postId, token, setMessaging, setUserInfo}) => {
    const [message, setMessage] = useState("");

    const messageSubmit = async (event) => {
        event.preventDefault();
        const result = await addMessage(postId, message, token);
        if (result) {
            setMessaging(false);
            const refetch = await fetchUserInfo(token);
            setUserInfo(refetch.data);
            //display success message?
        }
    }

    return (
        <form onSubmit={messageSubmit}>
            <div className="mb-2">
                <textarea className="form-control w-50" onChange={event => setMessage(event.target.value)}></textarea>
            </div>
            <button type='submit' className="btn btn-primary">SEND</button>
        </form>
    )
}

export default Message;