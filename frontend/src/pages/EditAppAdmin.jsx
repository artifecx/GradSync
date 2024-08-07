import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAppData, updateApplication } from '../actions/AdminActions';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Sidebar } from '../components/Sidebar';
import { RxCross1 } from 'react-icons/rx';

export const EditAppAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, applicationData } = useSelector(state => state.admin);

  const [status, setStatus] = useState("not");
  const [sideTog, setSideTog] = useState(false);

  useEffect(() => {
    dispatch(getAppData(id));
  }, [dispatch, id]);

  const updateStatusHandler = () => {
    const data = {
      status
    };
    dispatch(updateApplication(id, data));
  };

  const toUpperFirst = (str = "") => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

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

  const extractTime = (inputString) => {
    const dateTimeObj = new Date(inputString);

    const hours = dateTimeObj.getHours();
    const minutes = dateTimeObj.getMinutes();
    const seconds = dateTimeObj.getSeconds();

    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    const time12hr = `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;

    return time12hr;
  };

  return (
    <>
      <MetaData title="Update Application" />
      <div className="bg-[#F5F6F8] min-h-screen pt-14 flex relative">
        {/* Sidebar */}
        <div className={`transition-transform duration-300 ${sideTog ? 'translate-x-0' : '-translate-x-full'} fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40`}>
          <div
            onClick={() => setSideTog(false)}
            className="absolute top-4 right-4 text-xl cursor-pointer text-gray-600"
          >
            <RxCross1 />
          </div>
          <Sidebar sideTog={sideTog} />
        </div>
        <div className={`flex-1 pl-6 pr-4 py-4 ${sideTog ? 'ml-64' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <div
              onClick={() => setSideTog(!sideTog)}
              className="cursor-pointer bg-[#7A1515] text-white px-4 py-2 rounded-md"
            >
              {!sideTog ? "Menu" : <RxCross1 />}
            </div>
            <div className="text-3xl font-semibold text-[#7A1515]">Application #{id}</div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            applicationData && (
              <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="py- md:pt-3 pt-12 text-2xl md:text-4xl">Application #{id}</div>
                <div className="pt-4 pb-3">
                  <p className="text-2xl pb-2">Job Details:</p>
                  <div>
                    <ul>
                      <li className="flex gap-4 items-center">Role: <div>{applicationData.job.title}</div></li>
                      <li className="flex gap-4 items-center">Company: <div>{applicationData.job.companyName}</div></li>
                      <li className="flex gap-4 items-center">Location: <div>{applicationData.job.location}</div></li>
                      <li className="flex gap-4 items-center">Experience: <div>{applicationData.job.experience}</div></li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 pb-6">
                  <p className="text-2xl pb-2">Applicant Details:</p>
                  <div>
                    <ul>
                      <li className="flex gap-4 items-center">Name: <div>{applicationData.applicant.name}</div></li>
                      <li className="flex gap-4 items-center">Email: <div>{applicationData.applicant.email}</div></li>
                      <li className="flex gap-4 items-center">Resume: <Link to={applicationData.applicantResume.url} target="_blank" rel="noreferrer" className="text-blue-500 underline cursor-pointer">{applicationData.applicant.name}'s resume</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <div className="flex gap-3 items-center text-xl">Status: <span className={`${applicationData.status === "pending" ? "text-blue-600" : applicationData.status === "rejected" ? "text-red-600" : "text-green-600"} font-medium`}>{toUpperFirst(applicationData.status)}</span></div>
                </div>
                <div className="py-4">
                  <div className="flex gap-4">
                    <div>
                      <select onChange={(e) => setStatus(e.target.value)} id="large" className="block w-full px-6 py-3 text-base border bg-gray-900 border-gray-600 placeholder-gray-400 text-white">
                        <option value="not" selected>Select Status</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <button onClick={updateStatusHandler} className="bg-[#7A1515] text-white w-full md:w-[20rem] justify-center items-center flex px-4 py-2 mt-4">Update Status</button>
                  </div>
                </div>
                <div className="pt-2 pb-40">
                  <div className="flex gap-3 items-center text-xl">
                    Application Created At: {convertDateFormat(applicationData.createdAt.substr(0, 10))} on {extractTime(applicationData.createdAt)}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
