import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, testLogin } from "../api";

const Register = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setToken = props.setToken;
    let navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
            try {
                const response = await register(username, password);
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
                <button type='submit'>Sign Up</button>
            </form>
        </div>
        
    )
}

export default Register;