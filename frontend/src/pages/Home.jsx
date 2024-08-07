import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MetaData } from '../components/MetaData'
import { useSelector, useDispatch } from 'react-redux';
import { JobCard } from '../components/JobCard';
import { getAllJobs } from '../actions/JobActions';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import photo from "../assets/hero.png";

export const Home = () => {

    const [num, setNum] = useState(2);
    const dispatch = useDispatch()
    const { loading, allJobs } = useSelector(state => state.job)
    const [jobs, setJobs] = useState([])


    const data = [
        {
            link: "/images/JobData/1.jpg"
        },
        {
            link: "/images/JobData/2.jpg"
        },
        {
            link: "/images/JobData/3.jpg"
        },
        {
            link: "/images/JobData/4.jpg"
        },
        {
            link: "/images/JobData/5.jpg"
        },
        {
            link: "/images/JobData/6.jpg"
        },
        {
            link: "/images/JobData/7.jpg"
        },
        {
            link: "/images/JobData/8.jpg"
        },
        {
            link: "/images/JobData/9.jpg"
        },
        {
            link: "/images/JobData/10.jpg"
        },
        {
            link: "/images/JobData/11.jpg"
        },
        {
            link: "/images/JobData/12.jpg"
        },
        {
            link: "/images/JobData/13.jpg"
        },
        {
            link: "/images/JobData/14.jpg"
        },
        {
            link: "/images/JobData/15.jpg"
        },
        {
            link: "/images/JobData/16.jpg"
        },
        {
            link: "/images/JobData/17.jpg"
        },
        {
            link: "/images/JobData/18.jpg"
        },
        {
            link: "/images/JobData/19.jpg"
        },
        {
            link: "/images/JobData/20.jpg"
        }
    ]


    useEffect(() => {
        dispatch(getAllJobs())

    }, [])



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


        <>
            <MetaData title="GradSync" />
            <div className='min-h-screen md:px-20 px-3  pt-14 flex   text-[#000000] bg-[#F1F2F4]'>
            <div className='min-h-3 py-12'>

                <div className="hero-content py-12 flex items-center justify-between">
                    <div className="text-content w-[50%] mr-10">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Discover jobs that suit your <span className="text-[#7A1515]">interest & skills</span> today!
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-6">
                        Unlock your potential with GradSync. We connect you with opportunities that align with your expertise and passions, making the job search process simple and efficient. Whether you're looking for a new career path or a step up in your current field, we are here to help you find the perfect match. Start your journey with us and find the job that fits you best.
                        </p>
                        <div className="btn-grp">
                            <Link className="btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block" to="/jobs">
                                Job Search
                            </Link>
                        </div>
                    </div>
                    
                    <div className="placeholder">
                            <img className="max-w-full h-auto" src={photo} alt="job viva photo" />
                        </div>
                    </div>    

                <div className='pt-[8rem] md:px-[1rem] px-[0rem] w-full'>
                        
                <div className='titleT pb-6 text-2xl'>
                        <p className='titleT'>Featured Jobs</p>
                    </div>
                    <div>
                        {
                        loading ? 
                        <div className='w-full  flex justify-center items-center'>
                            
                            <span class="loader1"></span> 

                        </div> :
                            <div>
                                <div className='flex md:flex-row flex-col gap-3'>

                                    {allJobs && allJobs.length >= 4 ? (
                                        <>
                                            <Link to={`/details/${allJobs[3]?._id}`} className='flex gap-2 shadow-sm shadow-gray-800 border border-gray-700 md:w-[26rem] w-[21rem] p-2 flex-col hover:border-rose-500 transition duration-300 hover:scale-[1.02] hover:bg-slate-950'>
                                            <div className='flex gap-3'>
                                                <div className='w-[5rem] flex justify-center items-center' >
                                                    <img src={allJobs[3]?.companyLogo.url} alt={allJobs[3]?.title} className='w-[4rem]' />
                                                </div>
                                                <div>
                                                    <p className='text-xl'>{allJobs[3]?.title}</p>
                                                    <p className='text-lg'>{allJobs[3]?.companyName}</p>
                                                    <p className='text-sm'>{allJobs[3]?.description.slice(0, 30) + "..."}</p>
                                                </div>
                                            </div>
                                            <div className='flex text-sm gap-8'>
                                                <span>{convertDateFormat(allJobs[3]?.createdAt.slice(0,10))}</span>
                                                <span>
                                                    {allJobs[3]?.employmentType}
                                                </span>
                                                <span>
                                                    {allJobs[3]?.location}
                                                </span>
                                            </div>

                                        </Link>
                                            <Link  to={`/details/${allJobs[5]?._id}`} className='flex gap-2 shadow-sm shadow-gray-800 border border-gray-700 md:w-[26rem] w-[21rem] p-2 flex-col hover:border-rose-500 transition duration-300 hover:scale-[1.02] hover:bg-slate-950'>
                                            <div className='flex gap-3 '>
                                                <div className='w-[5rem]  flex justify-center items-center' >
                                                    <img src={allJobs[5]?.companyLogo.url} alt={allJobs[5]?.title} className="w-[4rem]" />
                                                </div>
                                                <div>
                                                    <p className='text-xl'>{allJobs[5]?.title}</p>
                                                    <p className='text-lg'>{allJobs[5]?.companyName}</p>
                                                    <p className='text-sm'>{allJobs[5]?.description.slice(0, 30) + "..."}</p>
                                                </div>
                                            </div>
                                            <div className='flex text-sm gap-8'>
                                                <span>{convertDateFormat(allJobs[3]?.createdAt.slice(0,10))}</span>
                                                <span>
                                                    {allJobs[5]?.employmentType}
                                                </span>
                                                <span>
                                                    {allJobs[5]?.location}
                                                </span>
                                            </div>

                                        </Link>
                                            <Link  to={`/details/${allJobs[2]?._id}`} className='flex gap-2 shadow-sm shadow-gray-800 border border-gray-700 md:w-[26rem] w-[21rem] p-2 flex-col hover:border-rose-500 transition duration-300 hover:scale-[1.02] hover:bg-slate-950'>
                                            <div className='flex gap-3'>
                                                <div className='w-[5rem]  flex justify-center items-center' >
                                                    <img src={allJobs[2]?.companyLogo.url} alt={allJobs[2]?.title} className="w-[4rem]" />
                                                </div>
                                                <div>
                                                    <p className='text-xl'>{allJobs[2]?.title}</p>
                                                    <p className='text-lg'>{allJobs[2]?.companyName}</p>
                                                    <p className='text-sm'>{allJobs[2]?.description.slice(0, 30) + "..."}</p>
                                                </div>
                                            </div>
                                            <div className='flex text-sm gap-8'>
                                                <span>{convertDateFormat(allJobs[2]?.createdAt.slice(0,10))}</span>
                                                <span>
                                                    {allJobs[2]?.employmentType}
                                                </span>
                                                <span>
                                                    {allJobs[2]?.location}
                                                </span>
                                            </div>

                                        </Link>
                                        
                                        </>
                                    ) : null}
                                </div>
                         </div>
                        }
                    </div>

                </div>


                <div className='pt-20 flex flex-col gap-4 md:px-[1rem] px-[1rem] '>
                    <div className='text-2xl titleT '>
                        Companies on our site
                    </div>
                    <div className="flex flex-wrap gap-3 ">
                        {
                            data.map((e, i) => (
                                <div key={i}>
                                    <img src={e.link} className='w-[4rem] ' alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                

                <Testimonials />
                
                <div className="pt-[7rem] pb-[10rem] md:px-[14rem] px-[1rem]   text-center">
                    <p>Discover the Power of Possibility with GradSync: Where Your Professional Journey Takes Flight, Guided by a Network of Diverse Opportunities!</p>
                </div>


            </div>
                        
            </div>


        </>
    )
}
