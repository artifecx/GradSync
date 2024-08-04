import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { MetaData } from '../components/MetaData';
import { Loader } from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleJob, saveJob } from '../actions/JobActions';
import { TbCurrencyPeso } from "react-icons/tb";
import { AiOutlineSave, AiOutlineBook } from 'react-icons/ai';
import { HiStatusOnline } from 'react-icons/hi';
import { BsPersonWorkspace, BsSend } from 'react-icons/bs';
import { TbLoader2 } from 'react-icons/tb';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

export const JobDetails = () => {
  const dispatch = useDispatch();
  const { jobDetails, loading, saveJobLoading } = useSelector(state => state.job);
  const { me, isLogin } = useSelector(state => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [matchPercentage, setMatchPercentage] = useState(null);

  useEffect(() => {
    dispatch(getSingleJob(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (jobDetails && me) {
      calculateMatch();
    }
  }, [jobDetails, me]);

  const calculateMatch = async () => {
    try {
      const applicant = {
        skills: me.skills
      };

      const jobListing = {
        skills: jobDetails.skillsRequired,
        description: jobDetails.description
      };

      const response = await axios.post('https://gradsync-backend.vercel.app/api/v1/calculateMatch', { applicant, jobListing });
      setMatchPercentage(response.data.matchPercentage);
    } catch (error) {
      console.error('Error calculating match:', error);
    }
  };

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

  const getEmploymentTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-200 text-green-800';
      case 'Part-time':
        return 'bg-orange-200 text-orange-800';
      case 'Contract':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      <MetaData title="Listed Jobs" />
      <div className='bg-[#F5F6F8] min-h-screen pt-16 px-4 md:px-12 text-black'>
        {loading ? (
          <Loader />
        ) : (
          jobDetails && (
            <div className='container mx-auto bg-white rounded-lg shadow-lg p-6'>
              <div className='flex flex-col md:flex-row items-center md:items-start justify-between'>
                <div className='flex items-center'>
                  <div className='w-24 md:w-32 flex-shrink-0'>
                    <img
                      src={jobDetails.companyLogo.url}
                      className='h-24 md:h-32 w-24 md:w-32 object-cover rounded-md'
                      alt={jobDetails.companyName}
                    />
                  </div>
                  <div className='md:ml-6'>
                    <div class="flex space-x-3 "> 
                      <div> <h1 className='text-3xl md:text-4xl font-bold'>{jobDetails.title}</h1></div>
                      <div className='py-2'> <span className={`px-1 py-1 flex-center rounded ${ getEmploymentTypeClass (jobDetails.employmentType)}`}>
                      {capitalizeWords(jobDetails.employmentType)} 
                    </span></div>
                    </div>
                    <h2 className='text-lg md:text-xl font-semibold mt-2 pr-2'>at {jobDetails.companyName }</h2>
                    
                    {isLogin && matchPercentage !== null && (
                    <p className='text-lg mt-2 text-blue-700'>
                      Match Percentage: {matchPercentage}%
                    </p>
                  )}
                    
                    <div className='mt-2'>
                      <p className='text-sm md:text-md'>{jobDetails.location}</p>
                      <p>
                        <span className={` ${jobDetails.status === "active" ? "text-green-700" : "text-red-500"} w-20 text-center rounded-lg font-semibold`}>
                          {jobDetails.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-4 md:mt-0'>
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
                      <AiOutlineBook />
                    )}
                  </button>

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
                </div>
              </div>
              <div className='border-b mt-4 mb-6'></div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='text-2xl font-bold mb-4'>Job Description:</h3>
                  <p className='whitespace-pre-wrap'>{jobDetails.description}</p>
                </div>
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
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
