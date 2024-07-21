import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const [fullName, setfullName] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(){
        try {
            const response = await axios.post('http://localhost:4000/signup', { username, password, fullName, email });
            // const { jwtToken } = response.data;
            // localStorage.setItem('jwtToken', jwtToken);
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    }
    
    return (
        <div>
            <div>
                <div>
                    Full name:<input type="text" onChange={(e) => {
                        setfullName(e.target.value);
                    }}></input>
                </div>
                <div>
                    Username:<input type="text" onChange={(e) => {
                        setusername(e.target.value);
                    }}></input>
                </div>
                <div>
                    Email id:<input type="text" onChange={(e) => {
                        setemail(e.target.value);
                    }}></input>
                </div>
                <div>
                    Password:<input type="password" onChange={(e) => {
                        setpassword(e.target.value);
                    }}></input>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}