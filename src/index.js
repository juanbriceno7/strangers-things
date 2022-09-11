import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import { fetchUserInfo } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Home,
  Login,
  Register,
  Posts,
  AddPost,
  Profile,
  SinglePost
} from './components';


const App = () => {
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  function logOut() {
    setToken('');
  }

  function makeHeaders() {
    if (token !== '') {
      return (
        <>
          <Link to='/profile' className='m-2 text-white'>PROFILE</Link>
          <Link to='/posts' className='m-2 text-white' onClick={logOut}>LOG OUT</Link>
        </>
      )
    }
    else {
      return <Link to='/login' className='m-2 text-white'>LOG IN</Link>
    }
  }

  useEffect(() => {
    async function fetchUserData(token) {
      const result = await fetchUserInfo(token);
      setUserInfo(result.data);
    }
    if (token !== '') {
      fetchUserData(token);
    }
  }, [token])

  return (
    <div className="App">
      <header className='bg-secondary text-white mb-2 pb-1'>
      <div className='d-flex ms-3 pt-2'>
        <h3 className='flex-grow-1'>Stranger's Things</h3>
        <div className='align-self-end'>
          <Link to='/posts' className='m-2 text-white'>POSTS</Link>
          {makeHeaders()}
        </div>
      </div>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts' element={<Posts posts={posts} setPosts={setPosts} token={token}/>}></Route>
          <Route path='/login' element={<Login setToken={setToken}/>}></Route>
          <Route path='/register' element={<Register setToken={setToken}/>}></Route>
          <Route path='/addpost' element={<AddPost token={token} setUserInfo={setUserInfo}/>}></Route>
          <Route path='/profile' element={<Profile userInfo={userInfo}/>}></Route>
          <Route path='/posts/:postId' element={<SinglePost posts={posts} setPosts={setPosts} setUserInfo={setUserInfo} token={token}/>}></Route>
        </Routes>
        
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
