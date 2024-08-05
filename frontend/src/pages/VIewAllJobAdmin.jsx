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
      <div className="bg-[#F1F2F4] min-h-screen pt-14 flex relative">
        {/* Sidebar */}
        <div className={`transition-transform duration-300 ${sideTog ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40`}>
          <div
            onClick={() => setSideTog(false)}
            className="absolute top-4 right-4 text-xl cursor-pointer text-gray-600"
          >
            <RxCross1 />
          </div>
          <Sidebar sideTog={sideTog} />
        </div>
        <div className={`flex-1 pl-6 pr-4 py-4 ${sideTog ? 'ml-64' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <div
              onClick={() => setSideTog(!sideTog)}
              className="cursor-pointer bg-[#7A1515] text-white px-4 py-2 rounded-md"
            >
              {!sideTog ? "Menu" : <RxCross1 />}
            </div>
            <div className="text-3xl font-semibold text-[#7A1515]">All Jobs</div>
            <div className="w-1/2 md:w-1/3 relative">
              <div className="bg-white flex items-center rounded-md shadow-md">
                <FiSearch size={20} className="text-gray-500 ml-4" />
                <input
                  value={search}
                  onChange={(e) => searchHandler(e.target.value)}
                  type="text"
                  className="outline-none text-gray-700 w-full px-2 py-1"
                  placeholder="Search by job title, position, keyword..."
                />
                {search && (
                  <RxCross2
                    size={19}
                    onClick={() => setSearch('')}
                    className="text-gray-500 mr-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          {loading ? <Loader /> : (
            <>
              <div className="bg-white shadow-md rounded-md overflow-x-auto">
                <table className="w-full text-sm text-gray-600">
                  <thead className="text-xs text-[#7A1515] uppercase bg-gray-100">
                    <tr>
                      <th className="px-6 py-3">Job Id</th>
                      <th className="px-6 py-3">Job Name</th>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Posted On</th>
                      <th className="px-6 py-3">Action</th>
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
                className="mt-4"
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                count={totalPageCount}
                renderItem={(item) => (
                  <PaginationItem
                    components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: '#7A1515',
                      },
                      '& .Mui-selected': {
                        backgroundColor: '#7A1515',
                        color: 'white',
                      },
                      '& .MuiPaginationItem-circle': {
                        borderRadius: '50%',
                      },
                      '& .MuiPaginationItem-ellipsis': {
                        color: '#7A1515',
                      },
                    }}
                  />
                )}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
