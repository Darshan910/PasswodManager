import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();

    const [form, setform] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (e.password !== e.confirmPassword) {
            toast.error("Both password and confirmPassword should Match");
            return
        }

        let response = await fetch('http://localhost:3000/api/v1/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            toast.info(json.message)
            // alert("Enter Valid Credentials..")
            // alert(json.message)
        }
        if (json.success) {
            toast.success(json.message);
            navigate('/login')
        }
    }


    return (
        <div>
            <div className="absolute top-0 -z-10 h-full w-full bg-cyan-900 opacity-10 blur-[80px]"></div>
            <div className="flex min-h-full flex-col justify-center py-5 lg:px-8 border-2 border-red-800">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center flex-col gap-5">
                    <div className="logo font-bold text-3xl">
                        <span>Pass</span>
                        <span className='text-cyan-600'>Manager</span>
                    </div>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[30rem] border-2 rounded-md mx-10 px-5 border-zinc-500">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register Now</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                            <div className="mt-1">
                                <input value={form.firstName} onChange={handleChange} id="firstName" name="firstName" type="text" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                            <div className="mt-1">
                                <input value={form.lastName} onChange={handleChange} id="lastName" name="lastName" type="text" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-1">
                                <input value={form.email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-1">
                                <input value={form.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-1">
                                <input value={form.confirmPassword} onChange={handleChange} id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register me</button>
                        </div>
                    </form>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        Already Registered ?
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login Now</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
