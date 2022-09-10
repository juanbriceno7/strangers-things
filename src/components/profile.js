import { useEffect } from "react"
import { Link } from "react-router-dom"

const Profile = ({userInfo}) => {
    const sent = userInfo.messages.filter(message => message.fromUser._id === userInfo._id);
    const recieved = userInfo.messages.filter(message => message.fromUser._id !== userInfo._id);
    const activePosts = userInfo.posts.filter(post => post.active === true);
    useEffect(() => {
        
    }, [])

    return (
        <>
        <div>
        <h2>Messages:</h2>
        <h3>Sent:</h3>
        {sent.map(message => {
                return (
                    <div className="card" key={message._id}>
                        <h4>From: {message.fromUser.username}</h4>
                        <p>{message.content}</p>
                        <span><b>Post: </b><Link to={`/posts/${message.post._id}`}>{message.post.title}</Link></span>
                    </div>
                )
        })}
        <h3>Recieved:</h3>
        {recieved.map(message => {
                return (
                    <div className="card" key={message._id}>
                        <h4>From: {message.fromUser.username}</h4>
                        <p>{message.content}</p>
                        <span><b>Post: </b><Link to={`/posts/${message.post._id}`}>{message.post.title}</Link></span>
                    </div>
                )
            })}
        </div>
        <div>
            <h2>Posts: </h2>
            {activePosts.map(post => {
                return (
                    <div className="card" key={post._id}>
                        <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                        <p>{post.description}</p>
                        <p>Price: <span>{post.price}</span></p>
                        <p>Location: <span>{post.location}</span></p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Profile;