import {
    Link,
    useNavigate
} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const JWT_TOKEN = "";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(){
        try {
            const response = await axios.post('http://localhost:4000/signin', { username, password });
            const { jwtToken } = response.data;
            localStorage.setItem('jwtToken', jwtToken);
            navigate('/main');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    return (
        <div>
            <div>
                <div>
                    Username:<input type="text" onChange={(e) => {
                        setUsername(e.target.value);
                        // console.log(username);
                    }}></input>
                </div>
                <div>
                    Password:<input type="password" onChange={(e) => {
                        setPassword(e.target.value);
                        // console.log(username);
                    }}></input>
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <p>Don't have an account? <Link to="/signup">Click here</Link> to make a new account</p>
            </div>
        </div>
    );
}