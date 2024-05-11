import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiConnector } from '../services/apiconnector';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ site: "", username: "", sitePassword: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const ref = useRef();
    const passwordRef = useRef();
    const token = localStorage.getItem("token");

    const getPasswords = async () => {
        if (!token) {
            console.log("No token in GETPASSWORD")
            console.log(token)
            return;
        }
        try {
            console.log("INSIDE GETPASSSS")
            const response = await apiConnector("GET", "http://localhost:3000/api/site", {
                withCredentials: true
            });
            setPasswordArray(response)
        } catch (error) {
            console.log("Error in getting Passwords")
            console.error(error)
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = (params) => {
        if (ref.current.src.includes("icons/cross_eye.png")) {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye.png"
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "/icons/cross_eye.png"
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async (e) => {
        if (!token) {
            navigate('/login');
            toast.info("Kindly Login, First")
            return;
        }
        e.preventDefault();
        try {
            if (form.site.length < 3 || form.username.length < 3 || form.sitePassword.length < 3) {
                toast.error("Length of all field must be atleast 3");
            } else {
                if (!form.id) {
                    const response = await apiConnector("POST", "http://localhost:3000/api/site", {
                        site: form.site,
                        username: form.username,
                        sitePassword: form.sitePassword
                    })
                    if (response.success) {
                        toast.success(response.message)
                        getPasswords()
                    } else {
                        toast.error("Error in Password Saving")
                    }
                } else {
                    const response = await apiConnector("PUT", `http://localhost:3000/api/site/${form.id}`, {
                        site: form.site,
                        username: form.username,
                        sitePassword: form.sitePassword
                    })
                    if (response.success) {
                        toast.success(response.message)
                        getPasswords()
                    } else {
                        toast.error("Error in Password Saving")
                    }
                }
                setForm({ site: "", username: "", sitePassword: "" })
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in savePassword")
            console.error(error)
        }
    }

    const copyText = (text) => {
        toast('Copied to clipboard');
        navigator.clipboard.writeText(text);
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you Really want to delete this password..?");
        if (c) {
            try {
                const response = await apiConnector("DELETE", `http://localhost:3000/api/site/${id}`)
                if (response.success) {
                    toast.success(response.message)
                    getPasswords()
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.log("Error in deletePassword")
                console.error(error)
            }
        }
    }

    const editPassword = async (id) => {
        try {
            let res = await getPasswords();
            setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
            setPasswordArray(passwordArray.filter(item => item.id !== id))
        } catch (error) {
            console.log("Error in editPasswords")
            console.error(error)
        }
    }


    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-cyan-900 opacity-20 blur-[100px]"></div>

            <div className='mx-auto md:container lg:px-36 min-h-[84.1vh]'>

                <h1 className="font-bold text-3xl text-center">
                    <span>Pass</span>
                    <span className='text-cyan-600'>Manager</span>
                </h1>

                <p className='text-cyan-800 text-lg text-center'>Your password Manager</p>

                <div className='text-white flex items-center flex-col p-4 gap-8'>

                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border-2 border-cyan-800 w-full text-black p-4 py-1' type="text" name="site" id="site" />

                    <div className='flex flex-col md:flex-row justify-between gap-3 w-full'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-cyan-800 w-full md:w-3/5 text-black p-4 py-1' type="text" name="username" id="username" />

                        <div className="relative w-full md:w-2/5">
                            <input value={form.sitePassword} onChange={handleChange} ref={passwordRef} placeholder='Enter Password' className='rounded-full border-2 border-cyan-800 w-full text-black p-4 py-1' type="password" name="sitePassword" id="password" />

                            <span className='absolute top-[5px] right-[1rem] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={35} src="/icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button className='flex items-center bg-cyan-500 rounded-full text-black font-bold w-fit px-10 py-1 gap-2 hover:bg-cyan-600 border-2 border-cyan-950' onClick={savePassword}>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>

                <div className="passwords py-2">

                    <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full text-cyan-800 rounded-md overflow-hidden min-w-[50vw]">
                        <thead className='bg-cyan-900 text-sky-500'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Password</th>
                                <th className='py-1'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-cyan-300'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center cursor-pointer'>
                                            <a href={item.site} target='__blank'>{item.site}</a>
                                            <div className='cursor-pointer copyBtn' onClick={() => { copyText(item.site) }}>
                                                <img className='w-7 h-7 p-1' src="/icons/copy.jpeg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center cursor-pointer'>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer copyBtn' onClick={() => { copyText(item.username) }}>
                                                <img className='w-7 h-7 p-1' src="/icons/copy.jpeg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center cursor-pointer'>
                                            <span>{item.sitePassword}</span>
                                            <div className='cursor-pointer copyBtn' onClick={() => { copyText(item.sitePassword) }}>
                                                <img className='w-7 h-7 p-1' src="/icons/copy.jpeg" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 border border-white text-center w-32'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <div className='flex justify-center items-center cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <span>Edit</span>
                                                <img className='w-[25px] h-[25px]' src="/icons/edit.webp" alt="Edit" />
                                            </div>
                                            <div className='flex justify-center items-center cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <span>Delete</span>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div >
        </>
    )
}

export default Manager
