import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from '@mantine/core';
import { FaBars, FaUserCircle, FaSave } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { MdOutlineBusinessCenter, MdOutlineDashboard, MdDoneAll } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logOrNot } from '../actions/UserActions';
import { useNavigate } from 'react-router-dom';
import { logoutClearState } from '../slices/UserSlice';
import logo from "../assets/logo2.png";

export const Navbar = () => {
    const { isLogin, me } = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        dispatch(logOrNot());
        navigate('/');
        toast.success("Logout Successful!");
        dispatch(logoutClearState());
    }

    return (
        <div className='text-white z-22 fixed min-w-full bg-[#7A1515]'>
            <ul className='md:flex hidden justify-center items-center gap-28 pt-3 pb-3 font-normal text-sm'>
                <Link to="/" className='flex fixed left-24 justify-center items-center titleT'>
                    <img src={logo} alt="Logo" className="h-8 mr-3" />
                </Link>

                <Link to="/" className='cool-link'>Home</Link>
                <Link to="/jobs" className='cool-link'>Find Job</Link>
                <Link to='/contact' className='cool-link'>Contact</Link>
                <Link to='/about' className='cool-link'>About</Link>

                {isLogin ? (
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Avatar className='cursor-pointer fixed right-32' radius="xl" src={me?.role === 'recruiter' ?  me?.companyLogo?.url : me?.avatar?.url} alt="Profile" />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Link to="/profile"><Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item></Link>
                            {me?.role === "admin" && <Link to="/admin/dashboard"><Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item></Link>}
                            {me?.role !== "admin" && <Link to="/applied"><Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item></Link>}
                            {me?.role !== "admin" && <Link to="/saved"><Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item></Link>}
                            <Menu.Divider />
                            <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                ) : (
                    <span className='fixed right-24 flex gap-3'>
                        <Link className='cursor-pointer font-semibold text-[16px] px-4 py-1 rounded-[3px] bg-white text-[#743030]' to="/login">Sign In</Link>
                        <Link className='cursor-pointer font-semibold text-[16px] px-4 py-1 rounded-[3px] bg-[#FFBF03] text-[#743030]' to="/register">Register</Link>
                    </span>
                )}
            </ul>

            <div className='py-3 px-3 md:hidden justify-between items-center flex'>
                <Link to="/" className='text-lg titleT flex justify-center items-center gap-1'>
                    <MdOutlineBusinessCenter size={19} /> GradSync
                </Link>
                <div className='flex justify-center items-center'>
                    <div className='pr-12'>
                        {isLogin ? (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Avatar size={28} className='cursor-pointer' radius="xl" src={me?.avatar?.url} alt="Profile" />
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Link to="/profile"><Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item></Link>
                                    {me?.role === "admin" && <Link to="/admin/dashboard"><Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item></Link>}
                                    {me?.role !== "admin" && <Link to="/applied"><Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item></Link>}
                                    {me?.role !== "admin" && <Link to="/saved"><Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item></Link>}
                                    <Menu.Divider />
                                    <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>Logout</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <span className='flex gap-3 fixed top-3 right-16'>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/login">Login</Link>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/register">Register</Link>
                            </span>
                        )}
                    </div>

                    <div className='pr-1'>
                        {toggle ? (
                            <RxCross1 size={24} className='cursor-pointer' onClick={() => setToggle(!toggle)} />
                        ) : (
                            <FaBars size={24} className='cursor-pointer' onClick={() => setToggle(!toggle)} />
                        )}
                    </div>
                </div>
            </div>

            <div className={` ${toggle ? "flex" : "hidden"} absolute w-screen h-screen z-20 md:hidden`}>
                <ul className='bg-gray-950 bg-opacity-95 flex flex-col gap-20 text-2xl justify-start w-screen pt-20 items-center'>
                    <Link onClick={() => setToggle(!toggle)} to="/" className='cool-link'>Home</Link>
                    <Link onClick={() => setToggle(!toggle)} to="/jobs" className='cool-link'>Jobs</Link>
                    <Link onClick={() => setToggle(!toggle)} to='/contact' className='cool-link'>Contact</Link>
                    <Link onClick={() => setToggle(!toggle)} to='/about' className='cool-link'>About</Link>
                </ul>
            </div>
        </div>
    );
}