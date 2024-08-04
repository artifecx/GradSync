import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components/Loader'
import { MetaData } from '../components/MetaData'
import { getSingleApplication, deleteApplication } from '../actions/ApplicationActions'
import { Link } from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { useNavigate } from 'react-router'

export const ApplicationDetails = () => {
    const { applicationDetails, loading } = useSelector(state => state.application)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    const deleteApplicationHandler = () => {
        dispatch(deleteApplication(id))
        navigate("/applied")
    }

    useEffect(() => {
        dispatch(getSingleApplication(id))
    }, [dispatch, id])

    const toUpperFirst = (str = "") => {
        return str.substring(0, 1).toUpperCase() + str.substring(1)
    }

    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-')
        if (parts.length !== 3) {
            return "Invalid date format"
        }
        const day = parts[2]
        const month = parts[1]
        const year = parts[0]
        return `${day}-${month}-${year}`
    }

    const extractTime = (inputString) => {
        const dateTimeObj = new Date(inputString)
        const hours = dateTimeObj.getHours()
        const minutes = dateTimeObj.getMinutes()
        const seconds = dateTimeObj.getSeconds()
        const period = hours >= 12 ? 'PM' : 'AM'
        const hours12 = hours % 12 || 12
        const time12hr = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
        return time12hr
    }

    return (
        <>
            <MetaData title="Application Details" />

            <div className='bg-[#F5F6F8] min-h-screen md:px-8 text-black flex items-center justify-center'>
                <div className='container mx-auto bg-white rounded-lg shadow-lg md:px-12 py-4 pb-8'>
                    <div className='py-4 text-center'>
                        <p className='text-4xl font-semibold'>Application to {applicationDetails.job.companyName}</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        {/* Job Details Column */}
                        <div className='flex-1'>
                            <div className='pt-4 pb-6'>
                                <p className='text-2xl font-semibold pb-2 text-[#7A1515]'>Job Details:</p>
                                <ul className='list-disc pl-5 space-y-2'>
                                    <li className='flex items-center gap-4'>Role: <span>{applicationDetails.job.title}</span></li>
                                    <li className='flex items-center gap-4'>Company: <span>{applicationDetails.job.companyName}</span></li>
                                    <li className='flex items-center gap-4'>Location: <span>{applicationDetails.job.location}</span></li>
                                    <li className='flex items-center gap-4'>Experience: <span>{applicationDetails.job.experience}</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Applicant Details Column */}
                        <div className='flex-1'>
                            <div className='pt-4 pb-6'>
                                <p className='text-2xl font-semibold pb-2 text-[#7A1515]'>Applicant Details:</p>
                                <ul className='list-disc pl-5 space-y-2'>
                                    <li className='flex items-center gap-4'>Name: <span>{applicationDetails.applicant.name}</span></li>
                                    <li className='flex items-center gap-4'>Email: <span>{applicationDetails.applicant.email}</span></li>
                                    <li className='flex items-center gap-4'>Resume: <Link to={applicationDetails.applicantResume.url} target="_blank" rel="noreferrer" className='text-blue-500 underline'>{applicationDetails.applicant.name}'s resume</Link></li>
                                </ul>
                            </div>

                            <div className='pt-2 flex gap-3'>
                                <p className='text-xl font-semibold'>Status: <span className={`${applicationDetails.status === "pending" ? "text-[#7A1515]" :
                                    applicationDetails.status === "rejected" ? "text-red-600" : "text-green-600"} font-medium`}>{toUpperFirst(applicationDetails.status)}</span></p>
                            </div>

                            <div className='pt-2 flex gap-3'>
                                <p className='text-s font-medium'>Application Created At: <span>{convertDateFormat(applicationDetails.createdAt.substr(0, 10))} on {extractTime(applicationDetails.createdAt)}</span></p>
                            </div>

                            <div className='py-4'>
                                {loading ? (
                                    <button className='bg-red-600 py-2 px-4 flex items-center font-bold justify-center'>
                                        <TbLoader2 className='animate-spin mx-16' size={23} />
                                    </button>
                                ) : (
                                    <button onClick={deleteApplicationHandler} className='text-white bg-[#7A1515] hover:bg-[#874444] py-2.5 text-m px-8 font-semibold'>
                                        Cancel Application
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
