import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { Loader } from '../components/Loader';
import { JobCard } from '../components/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../actions/JobActions';
import { Modal, Slider } from '@mantine/core';
import { RxCross2 } from 'react-icons/rx';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector(state => state.job);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: '',
    salary: 0,
    company: '',
  });

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      const filteredJobs = allJobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()));
      setJobs(filteredJobs);
    } else {
      setJobs(allJobs);
    }
  }, [search, allJobs]);

  const searchHandler = (value) => {
    setSearch(value);
  };

  const clearFilters = () => {
    setFilters({ category: '', salary: 0, company: '' });
    setIsFilterModalOpen(false);
  };

  const applyFilters = () => {
    let filtered = allJobs;
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    if (filters.salary) {
      filtered = filtered.filter(job => job.salary >= filters.salary);
    }
    if (filters.company) {
      filtered = filtered.filter(job => job.company === filters.company);
    }
    setJobs(filtered);
    setIsFilterModalOpen(false);
  };

  const jobList = jobs.slice((currentPage - 1) * 5, currentPage * 5);
  const totalPageCount = Math.ceil(jobs.length / 5);

  return (
    <>
      <MetaData title="Jobs" />
      <div className='bg-white min-h-screen min-w-screen pt-14 text-black'>
        {loading ? <Loader /> : (
          <div className='flex-col flex justify-center w-screen'>
            <div className='bg-[#7A1515] min-w-screen py-8'>
              <div className='py-3 pt-4 w-full flex justify-center items-center'>
                <div className='bg-white flex md:w-3/5 w-1/5 relative py-1.5 rounded-[7px]'>
                  <div className='bg-white flex px-2  w-full items-center'>
                    <FiSearch size={20} className='text-black ml-4' />
                    <input
                      value={search}
                      onChange={(e) => searchHandler(e.target.value)}
                      type="text"
                      className='outline-none text-black w-full px-2 py-1'
                      placeholder='Search by job title, position, keyword...'
                    />
                    <div className='bg-white'>
                    <button
                      className=' rounded-[3px] bg-[#F1F2F4] p-1.5 flex items-end justify-end'
                      onClick={() => setIsFilterModalOpen(true)}
                    >
                      <FiFilter size={20} className='text-black' />
                      <p className='text-black'>Filters</p>
                    </button>
                    
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
              </div>
             </div> 
            <Modal
              opened={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              title="Filter Jobs"
            >
              <div>
                <h5>Category</h5>
                <input
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  type="text"
                  placeholder="Category"
                />
                <h5>Salary</h5>
                <Slider
                  value={filters.salary}
                  onChange={(value) => setFilters({ ...filters, salary: value })}
                  min={0}
                  max={200000}
                  step={1000}
                />
                <h5>Company</h5>
                <input
                  value={filters.company}
                  onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  type="text"
                  placeholder="Company"
                />
                <button onClick={applyFilters} className='bg-blue-500 text-white p-2 mt-4'>Apply Filters</button>
                <button onClick={clearFilters} className='bg-gray-500 text-white p-2 mt-2'>Clear Filters</button>
              </div>
            </Modal>
            <div className='self-center w-[60vw] text-left pt-4 md:text-3xl text-2xl font-bold'>
              Jobs Found
            </div>
            <div className='self-center w-[60vw] bg-[#fffff] overflow-auto mt-4 mb-4 rounded-lg'>
              <div className='flex flex-col gap-4'>
                {jobList.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              {jobs.length === 0 && (
                <div className='text-center'>No jobs found.</div>
              )}
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
