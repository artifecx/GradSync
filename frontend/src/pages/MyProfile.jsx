import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const MyProfile = () => {
  const { loading, me, isLogin } = useSelector((state) => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();

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
      <div className="bg-[#F1F2F4] min-h-screen pt-14 md:px-20 px-3 text-[#7A1515]">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="text-left text-3xl absolute pl-4 underline-offset-8 md:pt-6 pt-3">
              <span className="font-medium">My Profile</span>
            </div>

            <div className="flex md:flex-row flex-col md:gap-12 justify-between items-top md:pt-12 border-blue-500 min-h-[90vh]">
              {/* Profile Picture Section */}
              <div className="md:w-1/3 w-full md:pb-0 pt-16 md:pt-10 gap-8 flex flex-col justify-start items-center">
                <div className="w-72 h-72 flex md:justify-center justify-start items-center">
                  <img src={me.avatar.url} className="rounded-full w-full h-full" alt="" />
                </div>
                <div className="flex justify-center items-center">
                  <Link to="/editProfile" className="bg-[#7A1515] px-10 py-2 font-semibold text-white rounded-[5px]">
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Profile Details Section */}
              <div className="md:w-1/3 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8">
                <div className="flex flex-col md:gap-5 gap-6">
                  <div>
                    <p className="md:text-2xl text-xl text-black font-bold">Full Name</p>
                    <p className="md:text-xl pt-1 text-lg">{me.name}</p>
                  </div>
                  <div>
                    <p className="md:text-2xl text-xl text-black font-bold">Email</p>
                    <p className="md:text-xl pt-1 text-lg">{me.email}</p>
                  </div>
                  <div>
                    <p className="md:text-2xl text-xl text-black font-bold">Joined On</p>
                    <p className="md:text-xl pt-1 text-lg">{convertDateFormat(me.createdAt.substr(0, 10))}</p>
                  </div>
                  {me.role !== 'admin' && (
                    <div>
                      <p className="md:text-2xl text-xl text-black font-bold">Skills</p>
                      <div className="md:text-xl text-lg pt-3 flex gap-3 flex-wrap">
                        {me.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-[3px] bg-white text-sm px-2 py-1 font-bold border"
                            style={{ borderColor: '#7a1515' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons Section */}
              <div className="md:w-1/3 w-full md:pt-4 pt-8">
                <ul className="flex flex-col gap-4">
                  {me.role !== 'admin' && (
                    <>
                      <li>
                        <button onClick={open} className="bg-[#7A1515] w-full text-white rounded-[5px] font-semibold px-5 py-1.5">
                          My Resume
                        </button>
                      </li>
                      <li>
                        <Link to="/applied">
                          <button className="bg-[#7A1515] w-full text-white rounded-[5px] font-semibold px-5 py-1.5">
                            My Applications
                          </button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/saved">
                          <button className="bg-[#7A1515] w-full text-white rounded-[5px] font-semibold px-5 py-1.5">
                            Saved Jobs
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/changePassword">
                      <button className="bg-[#7A1515] w-full text-white rounded-[5px] font-semibold px-5 py-1.5">
                        Change Password
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/deleteAccount">
                      <button className="bg-[#7A1515] w-full text-white rounded-[5px] font-semibold px-5 py-1.5">
                        Delete Account
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <Modal opened={opened} onClose={close} title="Resume">
              <div>
                <img src={me.resume.url} className="w-full h-full" alt="" />
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};
