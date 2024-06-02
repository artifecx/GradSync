import React, { useState, useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { registerUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import backgroundImage from "../assets/loginBG.png";

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
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className='bg-white min-h-screen pt-14 md:px-md text-[#7A1515] flex items-center justify-left w-full bg-opacity-0'>
          <form onSubmit={registerHandler} className='ml-28 flex flex-col p-8 bg-white rounded-md' style={{ maxWidth: '500px', width: '100%' }}>
            <div className="flex justify-between text-left mb-2">
              <div>
                <p className='text-left mb-3 text-4xl font-bold'>Recruiter</p>
                <p className="text-left text-black text-sm pb-6">Already have an account? <Link to="/login" className="text-[#7A1515] underline">Login now</Link></p>
              </div>
              <div>
                <p className="text-right text-black text-sm pb-6">Register as <Link to="/register" className="text-[#7A1515] underline">Applicant?</Link></p>
              </div>
            </div>

            <TextField
              id="name"
              name="name"
              label="Company / Organization Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#991b1b',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#991b1b',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: '400',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#991b1b',
                  fontWeight: '600',
                },
                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                  fontWeight: '600',
                },
              }}
            />

            <TextField
              id="email"
              name="email"
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#991b1b',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#991b1b',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: '400',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#991b1b',
                  fontWeight: '600',
                },
                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                  fontWeight: '600',
                },
              }}
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type={eyeTog ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#991b1b',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#991b1b',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontWeight: '400',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#991b1b',
                  fontWeight: '600',
                },
                '& .MuiInputLabel-root.MuiFormLabel-filled': {
                  fontWeight: '600',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setEyeTog(!eyeTog)}
                    >
                      {eyeTog ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className='flex space-x-4 mb-6 mt-4'>
              <label htmlFor="avatar" className="w-full cursor-pointer bg-white font-bold text-red-900 px-3 py-2 border border-red-800 rounded-sm shadow-sm hover:bg-yellow-500 focus:outline-none focus:border-red-900 text-center">
                {avatarName.length === 0 ? 'Upload Company Logo' : avatarName}
                <input id="avatar" name="avatar" type="file" accept="image/*" className="hidden" onChange={avatarChange} />
              </label>
            </div>

            <div>
              <button
                disabled={loading}
                className='bg-[#7A1515] hover:bg-[#A53D3D] text-white font-semibold py-2 px-4 rounded w-full flex justify-center items-center'
              >
                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
