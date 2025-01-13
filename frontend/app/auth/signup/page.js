import { useState } from 'react';
import apiInstance from '../../api_inst';

export default function Signup() {
    const [username, , setUsername,] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await apiInstance.post('/auth/register', { username, email, password });
            localStorage.setItem('_token', response.data.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
