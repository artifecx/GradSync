import React, { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUnlock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVpnKey } from 'react-icons/md';
import { TbLoader2 } from 'react-icons/tb';
import { changePass } from '../actions/UserActions';
import backgroundImage from "../assets/loginBG.png";
import { TextField, InputAdornment, IconButton } from '@mui/material';

export const ChangePassword = () => {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [eyeTog1, setEyeTog1] = useState(false);
  const [eyeTog2, setEyeTog2] = useState(false);
  const [eyeTog3, setEyeTog3] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();

    const data = { oldPassword, newPassword, confirmPassword };

    dispatch(changePass(data));

    if (loading === false) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <>
      <MetaData title="Change Password" />
      <div className="bg-cover bg-center min-h-screen md:px-20 px-3 text-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="min-h-screen pt-14 md:px-md text-[#7A1515] flex items-center justify-left w-full bg-opacity-0]">
          <form onSubmit={changeHandler} className="flex flex-col md:w-1/3 w-full md:mx-0 mx-4" style={{ maxWidth: '500px' }}>
            <div className="md:px-10  px-5 py-6 w-full flex flex-col gap-4">
              <div className="text-center mb-3">
                <p className="md:text-4xl text-3xl border-b font-semibold pb-3">Change Password</p>
              </div>

              <TextField
                id="oldPassword"
                name="oldPassword"
                label="Old Password"
                type={eyeTog1 ? 'text' : 'password'}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
                      <IconButton onClick={() => setEyeTog1(!eyeTog1)}>
                        {eyeTog1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={`input-field ${eyeTog1 && 'border-2 border-[#991b1b] hover:border-[#991b1b] hover:bg-white'}`}
              />

              <TextField
                id="newPassword"
                name="newPassword"
                label="New Password"
                type={eyeTog2 ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                      <IconButton onClick={() => setEyeTog2(!eyeTog2)}>
                        {eyeTog2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={`input-field ${eyeTog2 && 'border-2 border-[#991b1b] hover:border-[#991b1b] hover:bg-white'}`}
              />

              <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={eyeTog3 ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                      <IconButton onClick={() => setEyeTog3(!eyeTog3)}>
                        {eyeTog3 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className={`input-field ${eyeTog3 && 'border-2 border-[#991b1b] hover:border-[#991b1b] hover:bg-white'}`}
              />

              <div>
                <button
                  disabled={loading}
                  className="className='mt-4 bg-[#7A1515] hover:bg-[#A53D3D] text-white font-semibold py-2 px-4 rounded w-full flex justify-center items-center'"
                >
                  {loading ? <TbLoader2 className="animate-spin" size={24} /> : 'Change'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
