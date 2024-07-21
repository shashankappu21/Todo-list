import { useState } from "react"
import axios from "axios";

export default function Todo({onNewTodo}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit(){
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post('http://localhost:4000/todo', { 
                title,
                description
             }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
             });
             console.log(response.data.message);
             if (onNewTodo) {
                onNewTodo();  // Call the callback function to trigger fetching todos
            }
            
        } catch (error) {
            console.error('Error making todo:', error);
        }
    }
    
    return (
        <div>
            <div>
                Title: <input type="text" onChange={(e) => {
                    setTitle(e.target.value);
                }}></input>
            </div>
            <div>
                Description: <input type="text" onChange={(e) => {
                    setDescription(e.target.value);
                }}></input>
            </div>
            <button onClick={handleSubmit}>+</button>
        </div>
    )
}