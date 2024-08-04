import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

export const AdminJobCard = ({ job, onDelete }) => {
  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}-${month}-${year}`;
  };

  return (
    <tr className="border-b hover:bg-gray-900 bg-gray-950 border-gray-700 text-white">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {job._id}
      </th>
      <td className="px-6 py-4">{job.title}</td>
      <td className="px-6 py-4">{job.postedBy.companyName}</td>
      <td className="px-6 py-4">{job.location}</td>
      <td className="px-6 py-4">{convertDateFormat(job.createdAt.substr(0, 10))}</td>
      <td className="px-6 flex gap-4 py-4">
        <Link to={`/admin/job/details/${job._id}`} className='text-blue-500 hover:text-blue-400 cursor-pointer'>
          <MdOutlineModeEditOutline size={20} />
        </Link>
        <span className='text-red-500 hover:text-red-400 cursor-pointer' onClick={() => onDelete(job._id)}>
          <AiOutlineDelete size={20} />
        </span>
      </td>
    </tr>
  );
};
