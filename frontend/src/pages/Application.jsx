import React, { useState, useEffect } from 'react'
import { TbLoader2 } from 'react-icons/tb'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSingleJob } from '../actions/JobActions'
import { createApplication } from '../actions/ApplicationActions'
import { useNavigate } from 'react-router'

export const Application = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

    const { jobDetails } = useSelector(state => state.job)
    const { me } = useSelector(state => state.user)
    const { loading } = useSelector(state => state.application)
    const navigate = useNavigate()
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        dispatch(getSingleJob(id))
    }, [dispatch, id])

    const makeApplication = (e) => {
        e.preventDefault()
        dispatch(createApplication(id))
        navigate(`/details/${id}`)
    }

    return (
        <>
            <MetaData title="Job Details" />

            <div className='bg-[#F5F6F8] min-h-screen md:px-8 text-black flex items-center justify-center'>
                <div className='container mx-auto bg-white rounded-lg shadow-lg md:px-12 py-4 pb-8'>
                            <div className='py-4 text-center'>
                                <p className='text-4xl font-semibold'>Apply to {jobDetails.companyName}</p>
                            </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                            
                        {/* Job Details Column */}
                        <div className='flex-1'>
                            

                            <div className='pt-4 pb-6'>
                                <p className='text-2xl font-semibold pb-2 text-[#7A1515]'>Job Details:</p>
                                <ul className='list-disc pl-5 space-y-2'>
                                    <li className='flex items-center gap-4'>Role: <span>{jobDetails.title}</span></li>
                                    <li className='flex items-center gap-4'>Location: <span>{jobDetails.location}</span></li>
                                    <li className='flex items-center gap-4'>Experience: <span>{jobDetails.experience}</span></li>
                                </ul>
                            </div>
                        </div>

                        {/* Applicant Details Column */}
                        <div className='flex-1'>
                            <div className='pt-4 pb-6'>
                                <p className='text-2xl font-semibold pb-2 text-[#7A1515]'>Applicant Details:</p>
                                <ul className='list-disc pl-5 space-y-2'>
                                    <li className='flex items-center gap-4'>Name: <span>{me.name}</span></li>
                                    <li className='flex items-center gap-4'>Email: <span>{me.email}</span></li>
                                    <li className='flex items-center gap-4'>Resume: <Link to={me.resume.url} target="_blank" rel="noreferrer" className='text-blue-500 underline'>{me.name}'s resume</Link></li>
                                </ul>
                            </div>

                            <div className='flex items-start gap-3'>
                                <input type="checkbox" className="cursor-pointer" onChange={(e) => setConfirm(e.target.checked)} />
                                <p className='text-sm ml-2'>I confirm that all the information provided in this application is accurate and complete to the best of my knowledge. I understand that any false statements or omissions may result in disqualification from consideration or termination of application.</p>
                            </div>

                            <div className='pt-6 flex gap-3'>
                                {loading ? (
                                    <button disabled={true} className='px-8 py-2 bg-[#E5E8ED] text-[#7A1515] flex items-center gap-2 rounded-md'>
                                        <TbLoader2 className='animate-spin' size={20} />
                                    </button>
                                ) : (
                                    <button onClick={makeApplication} disabled={!confirm} className={`px-8 py-2 ${confirm ? "bg-[#7A1515] text-white" : "bg-[#E5E8ED] text-[#7A1515]"} flex items-center gap-2 rounded-md`}>
                                        Confirm
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
