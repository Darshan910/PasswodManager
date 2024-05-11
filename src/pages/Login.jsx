import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToken } from '../TokenContext';

const Login = () => {

    const { token, setTokenValue, removeToken } = useToken();

    const [form, setform] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiConnector("POST", 'http://localhost:3000/api/v1/auth/login', {
                email: form.email,
                password: form.password,
            });
            console.log(response);
            if (response.success) {
                toast.success("Login Successful");
                document.cookie = `token=${response.token}`;
                // localStorage.setItem("token", response.token);
                setTokenValue(response.token)
                console.log("this is local token", response.token)
                navigate('/');
                // setToken(response.token);
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error:', error);
            console.log("An error occurred while logging in. Please try again.");
        }

    }

    return (
        <div>
            <div className="absolute top-0 -z-10 h-full w-full bg-cyan-900 opacity-10 blur-[80px]"></div>
            <div className="flex min-h-full flex-col justify-center py-5 lg:px-8 h-[84.1vh]">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col gap-5">
                    <div className="logo font-bold text-3xl">
                        <span>Pass</span>
                        <span className='text-cyan-600'>Manager</span>
                    </div>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[30rem] border-2 rounded-md mx-10 px-5 border-zinc-500">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log In</h2>
                    <form className="space-y-6" onSubmit={handleOnSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-">
                                <input value={form.email} onChange={(e) => setform({ ...form, email: e.target.value })} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-1">
                                <input value={form.password} onChange={(e) => { setform({ ...form, password: e.target.value }) }} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login Now</button>
                        </div>
                    </form>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Not a Member ?
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
