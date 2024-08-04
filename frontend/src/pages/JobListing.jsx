import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { MetaData } from '../components/MetaData';
import { Loader } from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleJob, saveJob } from '../actions/JobActions';
import { BiBriefcase, BiBuildings } from 'react-icons/bi';
import { TbCurrencyPeso } from "react-icons/tb";
import { AiOutlineSave } from 'react-icons/ai'
import { HiStatusOnline } from 'react-icons/hi'
import { BsPersonWorkspace, BsSend } from 'react-icons/bs'
import { TbLoader2 } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'

export const JobListing = () => {
  const dispatch = useDispatch();
  const { jobDetails, loading, saveJobLoading } = useSelector(state => state.job);
  const { me, isLogin } = useSelector(state => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) return "Invalid date format";
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const saveJobHandler = () => {
    dispatch(saveJob(id));
  };

  const notLoginHandler = (action) => {
    if (!isLogin) {
      toast.info(`Please login to ${action} job`);
      navigate("/login");
    }
  };

  const capitalizeWords = (str) => str.replace(/\b\w/g, char => char.toUpperCase());

  return (
    <>
      <MetaData title="Job Details" />
      <div className='bg-[#F5F6F8] min-h-screen pt-16 px-4 md:px-12 text-black'>
        {loading ? (
          <Loader />
        ) : (
          jobDetails && (
            <div className='container mx-auto bg-white rounded-lg shadow-lg p-6'>
              <div className='flex flex-col md:flex-row items-center md:items-start'>
                <div className='w-24 md:w-32 flex-shrink-0'>
                  <img
                    src={jobDetails.companyLogo.url}
                    className='h-24 md:h-32 w-24 md:w-32 object-cover rounded-md'
                    alt={jobDetails.companyName}
                  />
                </div>
                <div className='md:ml-6 flex-1'>
                  <h1 className='text-2xl md:text-3xl font-bold uppercase'>{jobDetails.title}</h1>
                  <h2 className='text-lg md:text-xl font-semibold mt-2'>{jobDetails.companyName}</h2>
                  <p className='text-sm md:text-md mt-2'>{capitalizeWords(jobDetails.employmentType)} | {jobDetails.location}</p>
                  <p className='mt-2'>
                    <span className={` ${jobDetails.status === "active" ? "text-green-700" : "text-red-500"} w-20 text-center rounded-lg font-semibold`}>
                      {jobDetails.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className='border-b mt-4 mb-6'></div>
              <div>
                <h3 className='text-2xl font-bold mb-4'>Details:</h3>
                <ul className='space-y-4'>
                  <li className='flex items-center gap-3'><strong>Posted By:</strong> <div>{jobDetails.postedBy.name}</div></li>
                  <li className='flex items-center gap-3'><strong>Posted At:</strong> <div>{convertDateFormat(jobDetails.createdAt.substr(0, 10))}</div></li>
                  <li className='flex items-center gap-3'><strong>Location:</strong> <div>{jobDetails.location}</div></li>
                  <li className='flex items-center gap-3'><strong>Salary:</strong> <div className='flex items-center'><TbCurrencyPeso /><span>{jobDetails.salary}</span></div></li>
                  <li className='flex items-center gap-3'><strong>Experience:</strong> <div>{jobDetails.experience}</div></li>
                  <li className='flex items-center gap-3'><strong>Skills Required:</strong>
                    <div className='flex flex-wrap gap-2'>
                      {jobDetails.skillsRequired.map((skill, i) => (
                        <span key={i} className='px-2 py-0.5 bg-yellow-600 rounded text-black text-sm font-semibold'>{skill}</span>
                      ))}
                    </div>
                  </li>
                  <li className='mt-4'><strong className='text-2xl'>Job Description:</strong>
                    <p className='mt-2 whitespace-pre-wrap'>{jobDetails.description}</p>
                  </li>
                </ul>
              </div>
              <div className='mt-6 flex gap-4'>
                <button
                  onClick={() => {
                    if (isLogin) {
                      if (me.appliedJobs && me.appliedJobs.includes(jobDetails._id)) {
                        toast.error("You are already applied!");
                      } else {
                        navigate(`/Application/${jobDetails._id}`);
                      }
                    } else {
                      notLoginHandler("apply");
                    }
                  }}
                  className='hover:bg-green-600 text-lg font-bold px-6 py-2 bg-green-800 text-white flex items-center gap-1 rounded-md'
                >
                  <BsSend /> {me.appliedJobs && me.appliedJobs.includes(jobDetails._id) ? "Applied" : "Apply"}
                </button>

                <button
                  onClick={() => {
                    if (isLogin) {
                      saveJobHandler();
                    } else {
                      notLoginHandler("save");
                    }
                  }}
                  className='hover:bg-blue-600 text-lg font-bold px-6 py-2 bg-blue-800 text-white flex items-center gap-1 rounded-md'
                >
                  {saveJobLoading ? (
                    <span className='animate-spin'>
                      <TbLoader2 size={20} />
                    </span>
                  ) : (
                    <>
                      <AiOutlineSave />
                      {me.savedJobs && me.savedJobs.includes(jobDetails._id) ? "UnSave" : "Save"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
