import React from 'react'
import { Link } from 'react-router-dom'
import { saveJob } from '../actions/JobActions'
import { useDispatch, useSelector } from 'react-redux'


export const SaveJobCard = ({ job }) => {

    const dispatch = useDispatch()

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

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const unSaveJobHandler = () => {
        dispatch(saveJob(job._id))
    }


    return (
        // <div className='text-black flex flex-col gap-2 bg-[#f3f3f3] md:px-4 px-3 rounded-lg w-full py-2'>
        <div className='text-black shadow-sm bg-[#f3f3f3] rounded-lg px-4 py-2 flex flex-col gap-2 w-full'>
            
            <div className='flex gap-5 relative'>
                <div className='ml-2 mt-4 flex justify-between items-center'>
                    {/* <img src={job.companyLogo.url} className='md:w-[5em] h-16 w-16  md:h-20' alt="" /> */}
                </div>
                <div className='flex-1 ml-4'>

                    <div>
                        <h3 className="text-2xl font-bold">{job.title}</h3>
                    </div>

                    <div className='flex justify-between gap-2 '>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-semibold'>{capitalizeWords(job.employmentType)} | {job.companyName} - {job.location}</p>
                            <p className='text-sm'>{job.exp}</p>
                            <p className='text-sm md:flex hidden'>{job.description.slice(0, 90)}...</p>
                            <p className='text-sm flex md:hidden'>{job.description.slice(0, 25)}...</p>
                        </div>
                        <div className="flexitems-center mb-4 mt-2">
                            <Link to={`/details/${job._id}`} className="text-xs bg-red-800 hover:bg-red-700 text-white py-2 px-4 rounded-sm w-max">Apply</Link>
                            <button onClick={unSaveJobHandler} className="text-xs mr-2 bg-white hover:bg-yellow-500 text-red-800 py-2 px-4 rounded-sm w-max">UnSave</button>
                        </div>                     
                    </div>
                </div>
            </div>

            <div className='flex md:gap-8 gap-3 md:text-sm text-xs'>
                <div className="text-xs text-gray-600">Posted: {convertDateFormat(job.createdAt.substr(0, 10))}</div>
            </div>

        </div>
    )
}
