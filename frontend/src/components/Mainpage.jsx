import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Todo from './Todo';

const MainPage = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:4000/todos', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTodos(response.data.todos);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
    useEffect(() => {
        fetchTodos();
    },[])

    const handleNewTodo = () => {
        setLoading(true);
        fetchTodos();
    };

    async function handleCheck(id){
        const token = localStorage.getItem('jwtToken');
        const response = await axios.put(
            'http://localhost:4000/completed',
            { todoid: id },  // data (body)
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response.data.message);
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo._id === id ? { ...todo, completionStatus: !todo.completionStatus } : todo
            )
        );
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Main Page</h2>
            <Todo onNewTodo={handleNewTodo}/>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} style={{ textDecoration: todo.completionStatus ? 'line-through' : 'none' }}>
                        <h6>{todo.title} - </h6>
                        <p>{todo.description}</p>
                        <input type='checkbox' checked={todo.completionStatus} onChange={() => handleCheck(todo._id)}></input>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainPage;
