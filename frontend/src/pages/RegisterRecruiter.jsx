import React, { useState, useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { registerUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

export const RegisterRecruiter = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eyeTog, setEyeTog] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarName, setAvatarName] = useState("");

  const avatarChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarName(e.target.files[0].name);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const data = {
      companyName: name,
      email,
      password,
      companyLogo: avatar,
      role: "recruiter",
    };

    dispatch(registerUser(data));

    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
    setAvatarName("");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <MetaData title="Register" />
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 flex">
          <div className="w-2/3 bg-white flex flex-col justify-center items-center p-10">
            <div className="w-full max-w-xl space-y-8">
              <div className="flex justify-between items-center mb-8 w-full">
                <div className="text-left">
                  <h2 className="text-left text-3xl font-bold text-red-800">Register as Recruiter</h2>
                  <p className="text-gray-600 font-semibold">Already have an account? <Link to="/login" className="text-red-800">Login now</Link></p>
                </div>
                <div>
                  <p className="text-right text-gray-600 font-semibold">Register as <Link to="/register" className="text-red-800">Applicant?</Link></p>
                </div>
              </div>
              <form onSubmit={registerHandler} className="space-y-6 w-full">
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-maroon-500"
                    placeholder="Company / Organization Name"
                  />
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-maroon-500"
                    placeholder="Email Address"
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={eyeTog ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:border-maroon-500"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer" onClick={() => setEyeTog(!eyeTog)}>
                    {eyeTog ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <label htmlFor="avatar" className="w-full cursor-pointer bg-white font-bold text-red-900 px-3 py-2 border border-red-800 rounded-sm shadow-sm hover:bg-yellow-500 focus:outline-none focus:border-red-900 text-center">
                    {avatarName.length === 0 ? 'Upload Profile Picture' : avatarName}
                    <input id="avatar" name="avatar" type="file" accept="image/*" className="hidden" onChange={avatarChange} />
                  </label>
                </div>
                <div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-red-900 font-bold text-white rounded-sm shadow-md hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-75 flex justify-center items-center">
                  {loading ? <TbLoader2 className="animate-spin" size={24} /> : 'Sign Up'}
                </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-1/3 relative">
            <img src="/mnt/data/image.png" alt="Background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-red-800 opacity-50"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <p className="text-3xl font-bold">Over 12,345 opportunities waiting for good candidates.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
