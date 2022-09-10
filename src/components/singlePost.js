import { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { deletePost, fetchAllPostsAuthenticated, fetchAllPosts } from '../api';
import { EditPost, Message } from './index'

const SinglePost = ({posts, setPosts, token}) => {
    const { postId } = useParams();
    const post = posts.find(correctPost => correctPost._id === postId)
    const [isEditmode, setIsEditMode] = useState(false);
    const [messaging, setMessaging] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (token !== '') {
                    const results = await fetchAllPostsAuthenticated(token);
                    setPosts(results);
                }
                else {
                    const results = await fetchAllPosts();
                    setPosts(results);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchPosts();
    }, [isEditmode, messaging])

    if (!post) {
        return <h1>No Posts Found</h1>;
    }
    else {
        return (
            <div className='post'>
                {isEditmode ? 
                    <EditPost token={token} post={post} setIsEditMode={setIsEditMode} /> :
                    <>
                    <h3>{post.title}</h3>
                    <p className="description">{post.description}</p>
                    <p>Price: <span>{post.price}</span></p>
                    <p>Seller: <span>{post.author.username}</span></p>
                    <p>Location: <span>{post.location}</span></p>
                    {post.isAuthor && token !== '' ? 
                    // add options for poster, use returns to display messages
                    <>
                    <button onClick={() => setIsEditMode(true)}>EDIT</button>
                    <button onClick={() => {
                        deletePost(post._id, token)
                        navigate('/posts', { replace: true });
                        }} >DELETE</button>
                    </> :
                    null}
                    </>
                }
                {!post.isAuthor && token !== '' ? 
                <button onClick={() => setMessaging(true)}>MESSAGE</button> :
                null}
                {messaging ? 
                    <Message postId={post._id} token={token} setMessaging={setMessaging}/> :
                    null
                }
                <br></br>
                <section>
                    {post.messages.map(message => {
                        return(
                        <>
                        <div key={message._id}>
                            <h3>{message.fromUser.username}</h3>
                            <p>{message.content}</p>
                        </div>
                        </>
                        )
                    })}
                </section>
            </div>
        )
    }
}

export default SinglePost;