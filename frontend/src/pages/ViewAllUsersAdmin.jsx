import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { Sidebar } from '../components/Sidebar';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllUsersAdmin, deleteUser } from '../actions/AdminActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export const ViewAllUsersAdmin = () => {
  const dispatch = useDispatch();
  const { loading, allUsers } = useSelector((state) => state.admin);
  const [sideTog, setSideTog] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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

  return (
    <>
      <MetaData title="All Users" />
      <div className='bg-[#F1F2F4] min-h-screen pt-14 flex relative'>
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
            <div className="text-3xl font-semibold text-[#7A1515]">All Users</div>
          </div>

          {loading ? <Loader /> : (
            <div className="relative pb-24 overflow-x-auto shadow-md bg-white rounded-md">
              <table className="w-full text-sm text-gray-600">
                <thead className="text-xs text-[#7A1515] uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Id</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Created On</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers && allUsers
                    .filter(user => user._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((user, i) => (
                      <tr key={i} className="border-b hover:bg-gray-900 bg-gray-950 border-gray-700 text-white">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{user._id}</th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">{convertDateFormat(user.createdAt.substr(0, 10))}</td>
                        <td className="px-6 flex gap-4 md:pt-4 pt-6 py-4">
                          <Link to={`/admin/user/role/${user._id}`} className='text-blue-500 hover:text-blue-400 cursor-pointer flex justify-center items-center'>
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <span onClick={() => deleteUserHandler(user._id)} className='text-red-500 hover:text-red-400 cursor-pointer flex justify-center items-center'>
                            <AiOutlineDelete size={20} />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
