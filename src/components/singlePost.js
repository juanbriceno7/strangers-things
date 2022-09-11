import { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { deletePost, fetchAllPostsAuthenticated, fetchAllPosts, fetchUserInfo } from '../api';
import { EditPost, Message } from './index'

const SinglePost = ({posts, setPosts, setUserInfo, token}) => {
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
    }, [isEditmode, messaging, setPosts, token])

    if (!post) {
        return <h1 className='ms-2'>No Posts Found</h1>;
    }
    else {
        return (
            <div className='ms-5'>
                {isEditmode ? 
                    <EditPost token={token} post={post} setIsEditMode={setIsEditMode} /> :
                    <>
                    <h2>{post.title}</h2>
                    <p className="description">{post.description}</p>
                    <p>Price: <span>{post.price}</span></p>
                    <p>Seller: <span>{post.author.username}</span></p>
                    <p>Location: <span>{post.location}</span></p>
                    {post.isAuthor && (
                    <>
                    <button className="btn btn-primary me-2" onClick={() => setIsEditMode(true)}>EDIT</button>
                    <button className="btn btn-danger" onClick={async () => {
                        const success = await deletePost(post._id, token);
                        if (success) {
                            const refetch = await fetchUserInfo(token);
                            setUserInfo(refetch.data);
                            navigate('/profile');
                        }
                        }} >DELETE</button>
                    </> 
                    )}
                    </>
                }

                {!post.isAuthor && (
                messaging ? 
                    <Message postId={post._id} token={token} setMessaging={setMessaging} setUserInfo={setUserInfo}/> :
                    <button className="btn btn-primary" onClick={() => setMessaging(true)}>MESSAGE</button>
                )}
                {post.isAuthor && !isEditmode && (
                <div className="mt-4">
                    <h3>Messages</h3>
                    <section className="ms-4">
                        {post.messages.map(message => {
                            return(
                            <div key={message._id}>
                                <h4>{message.fromUser.username}</h4>
                                <p>{message.content}</p>
                            </div>
                            )
                        })}
                        {post.messages.length === 0 && (
                            <h4>No messages found</h4>
                        )}
                    </section>
                </div>
                )}
            </div>
        )
    }
}

export default SinglePost;