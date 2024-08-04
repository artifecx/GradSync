import React, { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const MyProfile = () => {
  const { loading, me } = useSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return 'Invalid date format';
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <MetaData title="My Profile" />
      <div className="bg-[#F1F2F4] min-h-screen pt-14 text-[#7A1515] flex">
          <>
            {/* Sidebar */}
            <div className="w-1/4 min-h-full bg-white shadow-md pt-6 p-4 flex flex-col items-left text-[#6B6F73]">
              <p className="text-s">Menu</p>
              <ul className="w-full flex flex-col gap-4 pt-4">
                <li>
                  <Link to="/profile">
                    <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2">
                      My Profile
                    </button>
                  </Link>
                </li>
                <li>
                  <button onClick={open} className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2">
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

            {/* Main Profile Dashboard */}
            <div className="w-3/4 pl-10 flex flex-col py-6 pr-6 gap-6">
            <p className='text-3xl font-semibold'>My Profile</p>

              {/* Profile Picture and Edit Profile Button */}
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
                      <p className="text-xl font-semibold">{me.role !== 'recruiter' ? me.name : me.companyName}</p>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className="text-lg text-gray-600">{me.email}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg text-gray-500">Joined on {convertDateFormat(me.createdAt.substr(0, 10))}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <Link to="/editProfile" className="bg-[#7A1515] px-5 py-2 font-semibold text-white rounded-md">
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white shadow-md p-6 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <MdPermIdentity className="text-gray-600 mr-2" size={20} />
                    <p className="w-full px-3 py-2 border rounded-md">{me.role !== 'recruiter' ? me.name : me.companyName}</p>
                  </div>
                  <div className="flex items-center">
                    <AiOutlineMail className="text-gray-600 mr-2" size={20} />
                    <p className="w-full px-3 py-2 border rounded-md">{me.email}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {me.role === 'applicant' && (
                <div className="bg-white shadow-md p-6 rounded-md">
                  <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                  <div className="flex gap-2 flex-wrap">
                    {me.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Resume Modal */}
            <Modal opened={opened} onClose={close} title="Resume">
              <div>
                <img src={me?.resume?.url} className="w-full h-full object-contain" alt="Resume" />
              </div>
            </Modal>
          </>
      </div>
    </>
  );
};
