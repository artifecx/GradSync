import React from 'react'
import { Link } from 'react-router-dom'

export const JobCard = ({ job }) => {
    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            return "Invalid date format";
        }

        const day = parts[2];
        const month = parts[1];
        const year = parts[0];

        return `${day}-${month}-${year}`;
    }

    return (
        <Link to={`/details/${job._id}`} className="text-black shadow-sm shadow-gray-800 rounded-lg px-4 py-2 flex flex-col gap-2 w-full">
            <div className="ml-2 mt-4 flex justify-between items-center">
                <img src={job.companyLogo.url} alt="Company Logo" className="h-24 w-24 object-cover" />
                <div className="flex-1 ml-4">
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="text-xs text-gray-600">Posted: {convertDateFormat(job.createdAt.substr(0, 10))}</div>
                    <p className="text-sm font-medium">{job.employmentType} | {job.companyName} - {job.location}</p>
                    <p className="text-sm mt-2">{job.description}</p>
                </div>
            </div>
            <div className="flexitems-center mb-4 mt-2">
                <button className="text-xs mr-2 bg-white hover:bg-yellow-500 text-red-800 py-2 px-4 rounded-sm w-max">See Details</button>
                <button className="text-xs bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-sm w-max">Send Application</button>
            </div>
        </Link>
    )
}
