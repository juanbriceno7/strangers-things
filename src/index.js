import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import { fetchUserInfo } from './api';
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

  function isLoggedIn() {
    if (token !== '') {
      return true;
    }
    else {
      return false;
    }
  }

  function makeHeaders() {
    if (isLoggedIn()) {
      return (
        <>
          <Link to='/profile'>PROFILE</Link>
          <Link to='/posts' onClick={logOut}>LOG OUT</Link>
        </>
      )
    }
    else {
      return <Link to='/login'>LOG IN</Link>
    }
  }

  useEffect(() => {
    if (token !== '') {
      async function fetchUserData(token) {
        const result = await fetchUserInfo(token);
        setUserInfo(result.data);
      }
      fetchUserData(token);
    }
  }, [token])

  return (
    <div className="App">
      <header>
      <div id="title">
            <h3>Stranger's Things</h3>
            <Link to='/posts'>POSTS</Link>
            {makeHeaders()}
        </div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/posts' element={<Posts posts={posts} setPosts={setPosts} token={token}/>}></Route>
          <Route path='/login' element={<Login setToken={setToken}/>}></Route>
          <Route path='/register' element={<Register setToken={setToken}/>}></Route>
          <Route path='/addpost' element={<AddPost token={token} />}></Route>
          <Route path='/profile' element={<Profile userInfo={userInfo}/>}></Route>
          <Route path='/posts/:postId' element={<SinglePost posts={posts} setPosts={setPosts} token={token}/>}></Route>
        </Routes>
      </header>
      <main>
        
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
