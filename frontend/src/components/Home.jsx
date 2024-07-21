import {
    Link,
    Route,
    Routes
} from 'react-router-dom';
import Login from './Login';

export default function Home(){
    return (
        <div>
            <h2>This is the Homepage</h2>
            <p><Link to="/login">Login</Link> here to continue</p>
        </div>
    )
}