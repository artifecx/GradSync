import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'


export const AppliedJobCard = ({id, job, time }) => {
    
    const dispatch = useDispatch()

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <div className='text-black shadow-sm bg-[#f3f3f3] rounded-lg px-4 py-2 flex flex-col gap-2 w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex-1 ml-4'>
          <div>
            <h3 className="text-xl font-bold uppercase">{job.title}</h3>
          </div>
          <div className='flex justify-between gap-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-semibold'>{capitalizeWords(job.employmentType)} | {job.companyName} - {job.location}</p>
              <p className='text-sm'>{job.exp}</p>
              <p className="text-sm mt-2" style={{ whiteSpace: 'pre-wrap' }}>{truncateDescription(job.description, 200)}</p>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 self-start">Applied On: {convertDateFormat(time.substr(0, 10))}</div>
      </div>
      <div className="flex items-center mb-4 mt-2 pl-4">
        <Link to={`/Application/Details/${id}`} className="text-xs font-semibold mr-2 bg-[#7A1515] hover:bg-yellow-500 text-white py-2 px-4 rounded-sm w-max">View Application</Link>
      </div>
    </div>
  );
};
