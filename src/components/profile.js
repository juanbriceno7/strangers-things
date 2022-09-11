import { Link } from "react-router-dom"

const Profile = ({userInfo}) => {
    if (Object.keys(userInfo).length !== 0) {
        const sent = userInfo.messages.filter(message => message.fromUser._id === userInfo._id);
        const recieved = userInfo.messages.filter(message => message.fromUser._id !== userInfo._id);
        const activePosts = userInfo.posts.filter(post => post.active === true);

    return (
        <>
        <div className="ms-3 mb-5">
            <h2>Messages:</h2>
            <div className="ms-4 mb-4">
                <h3>Sent:</h3>
                <div className="ms-5">    
                    {sent.map(message => {
                        return (
                        <div className="card p-2 mb-2 w-50" key={message._id}>
                            <h4>From: {message.fromUser.username}</h4>
                            <p>{message.content}</p>
                            <span><b>Post: </b><Link to={`/posts/${message.post._id}`}>{message.post.title}</Link></span>
                        </div>
                    )
                })}
                </div>
            </div>
            <div className="ms-4">
                <h3>Recieved:</h3>
                <div className="ms-5">
                    {recieved.map(message => {
                        return (
                            <div className="card p-2 mb-2 w-50" key={message._id}>
                                <h4>From: {message.fromUser.username}</h4>
                                <p>{message.content}</p>
                                <span><b>Post: </b><Link to={`/posts/${message.post._id}`}>{message.post.title}</Link></span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className="ms-3 mb-2">
            <h2>Posts: </h2>
            <div className="ms-5 ">
                {activePosts.map(post => {
                    return (
                        <div className="card p-2 mb-2" key={post._id}>
                            <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                            <p>{post.description}</p>
                            <p>Price: <span>{post.price}</span></p>
                            <p>Location: <span>{post.location}</span></p>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
    }
    else {
        return <h1 className="ms-2">Unauthorized</h1>
    }
}

export default Profile;