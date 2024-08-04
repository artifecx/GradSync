import React, { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { MetaData } from '../components/MetaData';
import { AiOutlineMail } from 'react-icons/ai';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { updateProfile, me as ME } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { loading, me } = useSelector((state) => state.user);

  const [name, setName] = useState(me.name);
  const [email, setEmail] = useState(me.email);
  const [skills, setSkills] = useState(me.skills);
  const [avatar, setAvatar] = useState("")
  const [avatarName, setAvatarName] = useState("")
  const [resume, setResume] = useState("")
  const [resumeName, setResumeName] = useState("")

  const avatarChange = (e) => {
    if (e.target.name === 'avatar') {
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
    if (e.target.name === 'resume') {
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

  const editHandler = (e) => {
    e.preventDefault();
    let skillArr = skills
        if(skills.constructor !== Array){
             skillArr = skills.split(",")
        }
        
    const data = {
      newName: name,
      newEmail: email,
      newAvatar: avatar,
      newResume: resume,
      newSkills: skillArr
    };
    dispatch(updateProfile(data));
  };

  useEffect(() => {
    if (!me) {
      dispatch(ME());
    } else {
      setName(me.name);
      setEmail(me.email);
      setSkills(me.skills.join(', '));
    }
  }, [dispatch, me]);

  return (
    <>
      <MetaData title="Edit Profile" />
      <div className="bg-[#F1F2F4] min-h-screen pt-14 text-[#7A1515] text-left flex">
          <>
            {/* Sidebar */}
            <div className="w-1/4 min-h-full bg-white shadow-md pt-6 p-4 flex flex-col items-left text-[#6B6F73]">
              <p className="text-s">Menu</p>
              {/* Navigation Menu */}
              <ul className="w-full flex flex-col gap-4 pt-4">
                <li>
                  <Link to="/profile">
                    <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2">
                      My Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2">
                    My Resume
                  </button>
                </li>
                <li>
                  <Link to="/applied">
                    <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2">
                      My Applications
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/changePassword">
                    <button className="bg-gray-500 w-full text-white rounded-md font-semibold px-5 py-2">
                      Change Password
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/deleteAccount">
                    <button className="bg-red-500 w-full text-white rounded-md font-semibold px-5 py-2">
                      Delete Account
                    </button>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Main Edit Profile Form */}
            <div className="w-3/4 pl-10 flex flex-col py-6 pr-6 gap-6">
            <p className='text-3xl font-semibold'>Edit Profile</p>
              {/* Profile Picture and Upload Buttons */}
              <div className="bg-white shadow-md p-6 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-40 h-40 rounded-full border-8 border-white overflow-hidden mr-4">
                    <img
                      src={me?.role === 'recruiter' ? me?.companyLogo?.url : me?.avatar?.url}
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="text-xl font-semibold">{me.name}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className="text-lg text-gray-600">{me.email}</p>
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="avatar" className="cursor-pointer px-3 py-2 border rounded-md text-gray-500">
                        {avatarName.length === 0 ? 'Change Profile Picture' : avatarName}
                      </label>
                      <input
                        id="avatar"
                        name="avatar"
                        onChange={avatarChange}
                        accept="image/*"
                        type="file"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <button
                    onClick={editHandler}
                    className="w-full px-5 py-2 mb-4 bg-[#7A1515] text-white rounded-md font-semibold "
                  >
                    Update
                  </button>

                  {me.role !== 'admin' && (
                    <div className="flex items-center">
                      <label htmlFor="resume" className="cursor-pointer px-3 py-2 border rounded-md text-gray-500">
                        {resumeName.length === 0 ? 'Upload New Resume' : resumeName}
                      </label>
                      <input
                        id="resume"
                        name="resume"
                        onChange={resumeChange}
                        accept="application/pdf"
                        type="file"
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex items-center">
                    <MdPermIdentity className="text-gray-600 mr-2" size={20} />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Full name"
                      type="text"
                      className="outline-none bold-placeholder w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  {/* Email */}
                  <div className="flex items-center">
                    <AiOutlineMail className="text-gray-600 mr-2" size={20} />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      type="email"
                      className="outline-none bold-placeholder w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                <div className="flex items-start">
                  <MdOutlineFeaturedPlayList className="text-gray-600 mr-2 mt-1" size={20} />
                  <textarea
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Skills"
                    type="text"
                    className="outline-none w-full text-black bold-placeholder px-1 pr-3 py-2"
                  />
                </div>
              </div>
            </div>
          </>
      </div>
    </>
  );
};
