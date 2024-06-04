import React from 'react'
import { Link } from 'react-router-dom'
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

        return `${day}-${month}-${year}`;
    }

   

    


    return (
        <div className='text-[#743030] flex flex-col gap-2 rounded-[10px] md:px-6 px- w-full py-6'>

            <div className='flex gap-5 relative'>
                <div className='flex justify-center items-center '>
                    <img src={job.companyLogo.url} className='md:w-[10em] md:h-[10em]' alt="" />
                </div>
                <div className='flex flex-col '>

                    <div>
                        <p className='md:text-4xl font-bold'>{job.title}</p>
                    </div>
                    <div className='flex justify-between gap-2 '>
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-medium'>{job.companyName}</p>
                            <p className='text-sm'>{job.exp}</p>
                            <p className='text-sm md:flex hidden'>{job.description.slice(0, 90)}...</p>
                            <p className='text-sm flex md:hidden'>{job.description.slice(0, 25)}...</p>
                        </div>
                        <div className='absolute md:right-3 right-0 md:pt-0 md:top-3 top-18  flex flex-col gap-3' >
                            <Link to={`/Application/Details/${id}`} className='"btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block'>View Application</Link>
                            
                        </div>


                    </div>

                </div>


            </div>

            <div className='flex md:gap-8 gap-3 md:text-sm text-xs'>
                <span>Applied on {convertDateFormat(time.substr(0, 10))}</span>
               
            </div>

        </div>
    )
}
