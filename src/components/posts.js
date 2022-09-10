import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPosts, fetchAllPostsAuthenticated } from '../api';
import { Search } from './index'

const Posts = ({posts, setPosts, token}) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    
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
    }, [posts])

    return (
        <div id='posts'>
            <header>
                <h1>Posts</h1>
                {/* search posts form */}
                {token !== '' ? 
                <Link to='/addpost'>Add Post</Link> :
                null
                }
            </header>
            <section>
                <Search posts={posts} searchValue={searchValue} setSearchValue={setSearchValue} setFilteredPosts={setFilteredPosts}/>
            </section>
            {searchValue === '' ? 
            <section>
            {posts.map(post => {
                return (
                    <div key={post._id} className='post'>
                        <h3><Link to={`/posts/${post._id}`}>{post.title}</Link></h3>
                        <p className="description">{post.description}</p>
                        <p>Price: <span>{post.price}</span></p>
                        <p>Seller: <span>{post.author.username}</span></p>
                        <p>Location: <span>{post.location}</span></p>
                    </div>
                )
            })}
            </section> :
            <section>
            {filteredPosts.map(post => {
                return (
                    <div key={post._id} className='post'>
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