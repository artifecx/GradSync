import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { Sidebar } from '../components/Sidebar';
import { Loader } from '../components/Loader';
import { RxCross1, RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobsAdmin, deleteJobData } from '../actions/AdminActions';
import { AdminJobCard } from '../components/AdminJobCard';
import { FiSearch } from 'react-icons/fi';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ViewAllJobAdmin = () => {
  const dispatch = useDispatch();
  const { loading, allJobs } = useSelector(state => state.admin);
  const [sideTog, setSideTog] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    dispatch(getAllJobsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase())
      );
      setJobs(filteredJobs);
    } else {
      setJobs(allJobs);
    }
  }, [search, allJobs]);

  const searchHandler = (value) => {
    setSearch(value);
  };

  const deleteJobHandler = (id) => {
    dispatch(deleteJobData(id));
  };

  const jobList = jobs.slice((currentPage - 1) * 5, currentPage * 5);
  const totalPageCount = Math.ceil(jobs.length / 5);

  return (
    <>
      <MetaData title="All Jobs" />
      <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3 text-white'>
        {loading ? <Loader /> : (
          <div>
            <div className="pt-1 fixed left-0 z-20 pl-0">
              <div onClick={() => setSideTog(!sideTog)} className='cursor-pointer blueCol px-3 py-2'>
                {!sideTog ? "Menu" : <RxCross1 />}
              </div>
            </div>
            <Sidebar sideTog={sideTog} />
            <div className='text-center pt-3 pb-4 text-3xl font-medium'>All Jobs</div>
            <div className='flex justify-center'>
              <div className='bg-white flex w-full md:w-3/5 relative py-1.5 rounded-[7px]'>
                <div className='bg-white flex px-2 w-full items-center'>
                  <FiSearch size={20} className='text-black ml-4' />
                  <input
                    value={search}
                    onChange={(e) => searchHandler(e.target.value)}
                    type="text"
                    className='outline-none text-black w-full px-2 py-1'
                    placeholder='Search by job title, position, keyword...'
                  />
                  {search && (
                    <RxCross2
                      size={19}
                      onClick={() => setSearch('')}
                      className='text-black mr-2 cursor-pointer'
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="relative pb-24 overflow-x-auto shadow-md mt-4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 uppercase blueCol dark:text-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3">Job Id</th>
                    <th scope="col" className="px-6 py-3">Job Name</th>
                    <th scope="col" className="px-6 py-3">Company</th>
                    <th scope="col" className="px-6 py-3">Location</th>
                    <th scope="col" className="px-6 py-3">Posted On</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobList.map(job => (
                    <AdminJobCard key={job._id} job={job} onDelete={deleteJobHandler} />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              className='self-center py-4'
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
                      backgroundColor: '#7A1515',
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
        )}
      </div>
    </>
  );
};
