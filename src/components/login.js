import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, testLogin } from "../api";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setToken = props.setToken;
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const response = await login(username, password);
            if (response) {
                setToken(response);
                navigate('/posts', { replace: true });
                // testLogin(response);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type='text' name='username' placeholder='Username' onChange={event => setUsername(event.target.value)} required></input>
                <input type='password' name='password' placeholder='Password' onChange={event => setPassword(event.target.value)} required></input>
                <button type='submit'>Log In</button>
            </form>
            <Link to='/register'>Sign Up</Link>
            
        </div>
        
    )
}

export default Login;