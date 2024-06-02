import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { loginUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import backgroundImage from "../assets/loginBG.png";

export const Login = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeTog, setEyeTog] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const data = { email, password };

    dispatch(loginUser(data));

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <MetaData title="Login" />
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='bg-white min-h-screen pt-14 md:px-md text-[#7A1515] flex items-center justify-left w-full bg-opacity-0'>
          <form onSubmit={loginHandler} className='ml-28 flex flex-col p-8 bg-white rounded-md' style={{ maxWidth: '500px', width: '100%' }}>
            <div className='text-left mb-6'>
              <p className='text-4xl font-bold'>Sign In</p>
            </div>

            <div className='text-left text-black text-sm pb-6'>
              <p>Don't have an account? <Link to="/register" className='text-[#7A1515] underline'>Create Account</Link></p>
            </div>

            <div className='bg-gray-100 flex items-center mb-4 rounded'>
              <div className='text-gray-600 px-2'>
                <AiOutlineMail size={20} />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder='Email'
                type="email"
                className='outline-none bg-transparent w-full text-black px-1 pr-3 py-2 rounded'
              />
            </div>

            <div className='bg-gray-100 flex items-center mb-6 rounded'>
              <div className='text-gray-600 px-2'>
                <AiOutlineUnlock size={20} />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder='Password'
                type={eyeTog ? "text" : "password"}
                className='outline-none bg-transparent w-full text-black px-1 pr-3 py-2 rounded'
              />
              <div className='text-gray-600 px-2 cursor-pointer'>
                {eyeTog ? <AiOutlineEye size={20} onClick={() => setEyeTog(!eyeTog)} /> : <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog(!eyeTog)} />}
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className='bg-[#7A1515] hover:bg-[#A53D3D] text-white font-semibold py-2 px-4 rounded w-full flex justify-center items-center'
              >
                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
