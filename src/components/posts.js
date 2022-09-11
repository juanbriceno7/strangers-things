import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllPosts, fetchAllPostsAuthenticated } from '../api';
import { Search } from './index'

const Posts = ({posts, setPosts, token}) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
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
    }, [])

    return (
        <div>
            <header className='m-3 d-flex'>
                <h1 className='flex-grow-1'>Posts</h1>
                {token !== '' && (
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/addpost')}>Add Post</button>
                )}
            </header>
            <section>
                <Search posts={posts} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredPosts={setFilteredPosts}/>
            </section>
            {searchValue === '' ? 
            <section>
            {posts.map(post => {
                return (
                    <div key={post._id} className='card m-1'>
                        <div className='card-body'>
                        <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                        <p className="description">{post.description}</p>
                        <p>Price: <span>{post.price}</span></p>
                        <p>Seller: <span>{post.author.username}</span></p>
                        <p>Location: <span>{post.location}</span></p>
                        </div>
                    </div>
                )
            })}
            </section> :
            <section>
            {filteredPosts.map(post => {
                return (
                    <div key={post._id} className='card'>
                        <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                        <p className="description">{post.description}</p>
                        <p>Price: <span>{post.price}</span></p>
                        <p>Seller: <span>{post.author.username}</span></p>
                        <p>Location: <span>{post.location}</span></p>
                    </div>
                )
            })}
            </section>}
        </div>
    )
}

export default Posts;