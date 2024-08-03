import React, { useEffect } from 'react'
import { MetaData } from '../components/MetaData'
import {getSavedJobs} from '../actions/JobActions'
import {useDispatch, useSelector} from 'react-redux'
import {Loader} from '../components/Loader'
import { SaveJobCard } from '../components/SaveJobCard'
import {Link} from 'react-router-dom'

export const SavedJobs = () => {

  const dispatch = useDispatch(0)

  const {savedJobs, saveJobLoading, loading} = useSelector(state => state.job)

  useEffect(()=>{
    dispatch(getSavedJobs())
  },[saveJobLoading])

  const reverseArr = (savedJobs) => {
      let l = 0 ;
      let e = savedJobs.length - 1 ;

      while(l <= e){
        let t = savedJobs[l] ;
        savedJobs[l] = savedJobs[e] ;
        savedJobs[e] = t ;

        l++ ;
        e-- ;
      }
      return savedJobs ;
  }
  
  return (
    <>

<MetaData title="Saved Jobs" />
      <div className='bg-white min-h-screen pt-14 md:px-20 px-3  text-black'>

            {loading ? <Loader/> :
              <div className='pt-6 md:px-28  px-1 pb-32' >
                  {savedJobs.length !== 0 && <div className='self-center w-[60vw] text-left py-4 md:text-3xl text-2xl font-bold'>Saved Jobs</div>}
                {
                 <div className='Pt-6 flex flex-col gap-4'>
                   {savedJobs.slice().reverse().map((job,i)=>(
                    <SaveJobCard key={i} job={job}/>
                  ))}
                 </div>
                }
                {
                  savedJobs.length === 0 && 
                  <div className='pt-10 text-center flex flex-col justify-center items-center'>


                        <div>
                          <img src="/images/jobEmpty.svg" className='w-52 h-52' alt="" />
                        </div>
                      <p className='md:text-3xl pb-6 pt-6 text-xl font-bold'>You don't have any saved jobs,</p>
                      <Link className="btn bg-[#7A1515] hover:[#A53D3D] text-white font-semibold py-2 px-4 rounded inline-block" to="/jobs">
                                Browse Jobs
                            </Link>
                  </div>
                }

            </div>
            
            }


        </div>
    
    
    </>
  )
}
