import { React, useState, useEffect } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useToken } from '../TokenContext';


const Navbar = () => {
    const navigate = useNavigate();
    const { token, setTokenValue, removeToken } = useToken();


    const handleLogOut = () => {
        removeToken()
    }

    return (
        <nav className='bg-slate-700 text-white lg:px-40'> 
            <div className="flex items-center h-14 mx-auto md:container">
                <div className="logo font-bold text-2xl w-10/12 p-6">
                    <Link to="/">
                        <span>Pass</span>
                        <span className='text-cyan-400'>Manager</span>
                    </Link>
                </div>
                <div className='container flex justify-end w-1/12'>
                    {(token === null)
                        ?
                        <div className='container flex justify-evenly w-1/4 gap-6 px-40'>
                            <Link to="/login">
                                <Button name="Login" />
                            </Link>
                            <Link to="/signup">
                                <Button name="Signup" />
                            </Link>
                        </div>
                        :
                        <div >
                            <Link to='/login' onClick={handleLogOut}>
                                <Button name="Logout" />
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
