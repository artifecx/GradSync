import React, { useState, useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { registerUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputAdornment, IconButton } from '@mui/material';

export const Register = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eyeTog, setEyeTog] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarName, setAvatarName] = useState("");

  const [resume, setResume] = useState("");
  const [resumeName, setResumeName] = useState("");

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

  const resumeChange = (e) => {
    if (e.target.name === "resume") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setResume(reader.result);
          setResumeName(e.target.files[0].name);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();

    const skillsArr = skills.split(",");
    const data = {
      name,
      email,
      password,
      avatar,
      resume,
      skills: skillsArr,
      role: 'applicant'
    };

    dispatch(registerUser(data));
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
          <div className="w-2/3 bg-white flex flex-col justify-center items-center p-10 relative">
            <div className="w-full max-w-xl space-y-8">
              <div className="flex justify-between items-center mb-8 w-full">
                <div className="text-left">
                  <h2 className="text-left text-3xl font-bold text-red-800">Register as Applicant</h2>
                  <p className="text-gray-600 font-semibold">Already have an account? <Link to="/login" className="text-red-800">Login now</Link></p>
                </div>
                <div>
                  <p className="text-right text-gray-600 font-semibold">Register as <Link to="/register-recruiter" className="text-red-800">Recruiter?</Link></p>
                </div>
              </div>
              <form onSubmit={registerHandler} className="space-y-6 w-full">
                <TextField
                  id="name"
                  name="name"
                  label="Full Name"
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
                <TextField
                  id="skills"
                  name="skills"
                  label="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
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
                <div className="flex space-x-4">
                  <label htmlFor="avatar" className="w-full cursor-pointer bg-white font-bold text-red-900 px-3 py-2 border border-red-800 rounded-sm shadow-sm hover:bg-yellow-500 focus:outline-none focus:border-red-900 text-center">
                    {avatarName.length === 0 ? 'Upload Profile Picture' : avatarName}
                    <input id="avatar" name="avatar" type="file" accept="image/*" className="hidden" onChange={avatarChange} />
                  </label>
                  <label htmlFor="resume" className="w-full cursor-pointer bg-white font-bold text-red-900 px-3 py-2 border border-red-800 rounded-sm shadow-sm hover:bg-yellow-500 focus:outline-none focus:border-red-900 text-center">
                    {resumeName.length === 0 ? 'Upload Resume / CV' : resumeName}
                    <input id="resume" name="resume" type="file" accept="application/pdf" className="hidden" onChange={resumeChange} />
                  </label>
                </div>
                <div>
                  <button type="submit" disabled={loading} className="w-full py-3 bg-red-900 font-bold text-white rounded-sm shadow-md hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-75 flex justify-center items-center">
                    {loading ? <TbLoader2 className="animate-spin" size={24} /> : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>
            <div className="absolute inset-0 bg-white transform rotate-12 origin-bottom-left" style={{zIndex: '-1', height: '140%', top: '-50%'}}></div>
          </div>
          <div className="w-1/3 relative" style={{zIndex: '-2'}}>
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
