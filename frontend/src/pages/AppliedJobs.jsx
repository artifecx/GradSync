import React, { useEffect } from 'react'
import {MetaData} from '../components/MetaData'
import {useDispatch, useSelector} from 'react-redux'
import {getAppliedJob} from '../actions/ApplicationActions'
import {Loader} from '../components/Loader'
import { AppliedJobCard } from '../components/AppliedJobCard'
import { Link } from 'react-router-dom'


export const AppliedJobs = () => {

  const {loading, appliedJobs} = useSelector(state => state.application) ;
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getAppliedJob())
  },[])




  return (
    <>

<MetaData title="Applied Jobs" />
      <div className='bg-white min-h-screen pt-14 md:px-25 px-3 text-[#7A1515]'>
        {loading? 
           <Loader/> :
           <>

             <div className='pt-6 md:px-[240px] px-1 min-h-full' >
                  {appliedJobs.length !== 0 && <div className='text-left text-4xl pb-8 font-bold'>Applied Jobs</div>}
                {
                  <div className='bg-[#F3F3F3] rounded-[10px] flex flex-col gap-4'>
                    {
                      appliedJobs.slice().reverse().map((app,i)=>(
                        <AppliedJobCard key={i} id={app._id} time={app.createdAt} job={app.job}/>
                      ))
                    }
                  </div>
                }
                {
                  appliedJobs.length === 0 && 
                  <div className='pt-10 text-center flex flex-col justify-center items-center'>


                        <div>
                          <img src="/images/jobEmpty.svg" className='w-52 h-52' alt="" />
                        </div>
                      <p className='md:text-3xl pb-6 pt-6 text-xl font-bold'>You don't have any applied jobs,</p>
                      <Link className="btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block" to="/jobs">
                                Browse Jobs
                            </Link>
                  </div>
                }

            </div>
           
           </>
       }


        </div>
    
    
    </>
  )
}
