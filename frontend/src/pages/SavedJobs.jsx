import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { getSavedJobs } from '../actions/JobActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { SaveJobCard } from '../components/SaveJobCard';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs, saveJobLoading, loading } = useSelector(state => state.job);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    dispatch(getSavedJobs());
  }, [dispatch]);

  const jobList = savedJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  const totalPageCount = Math.ceil(savedJobs.length / jobsPerPage);

  return (
    <>
      <MetaData title="Saved Jobs" />
      <div className='bg-white min-h-screen min-w-screen pt-14 text-black'>
        {loading ? <Loader /> :
          <div className='flex-col flex justify-center w-screen'>
            {savedJobs.length !== 0 && (
              <div className='self-center w-[60vw] text-left pt-4 md:text-3xl text-2xl font-bold'>Saved Jobs</div>
            )}
            {savedJobs.length > 0 && (
              <div className='self-center w-[60vw] bg-[#ffffff] overflow-auto rounded-lg'>
                <div className='pt-6 flex flex-col gap-4'>
                  {jobList.map((job, i) => (
                    <SaveJobCard key={i} job={job} />
                  ))}
                </div>
                <div className='flex justify-center mt-4'>
                  <Pagination
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                    count={totalPageCount}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                        sx={{
                          '& .MuiPaginationItem-root': {
                            color: '#f87171',
                          },
                          '& .Mui-selected': {
                            backgroundColor: '#991b1b',
                            color: 'white',
                          },
                          '& .MuiPaginationItem-circle': {
                            borderRadius: '50%',
                          },
                          '& .MuiPaginationItem-ellipsis': {
                            color: 'white',
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            )}
            {savedJobs.length === 0 && (
              <div className='pt-4 text-center flex flex-col justify-center items-center'>
                <div>
                  <img src="/images/jobEmpty.svg" className='w-52 h-52' alt="" />
                </div>
                <p className='md:text-3xl pb-6 pt-6 text-xl font-bold'>You don't have any saved jobs,</p>
                <Link className="btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block" to="/jobs">
                  Browse Jobs
                </Link>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};
