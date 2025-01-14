'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import apiInstance from '../../api_inst';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiInstance.post('/auth/login', { email, password }).then((response) => {
                localStorage.setItem('_token', response.data.token);
                router.push('/dashboard')
            });
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <>
            {isClient ? <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in to your account 🔐
                    </h1>

                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='email'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder='Your Email'
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                                id='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder='Your Password'
                            />
                        </div>

                        <div className='flex justify-center items-center mt-6'>
                            <button type="submit"
                                className={'bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark'}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div> : <div></div>}
        </>
    );
}
