import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';
import { getUserData, updateUser } from '../actions/AdminActions';
import { Sidebar } from '../components/Sidebar';
import { RxCross1 } from 'react-icons/rx';

export const EditUserAdmin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, userData } = useSelector(state => state.admin);
    const [role, setRole] = useState("not");
    const [sideTog, setSideTog] = useState(false);

    useEffect(() => {
        dispatch(getUserData(id));
    }, [dispatch, id]);

    const updateRoleHandler = () => {
        if (role === "not") {
            toast.info("Please Select Role !");
        } else {
            dispatch(updateUser(id, { role }));
            setRole("not");
        }
    };

    return (
        <>
            <MetaData title="Edit User Role" />
            <div className="bg-white min-h-screen pt-12 md:px-20 px-3 text-[#7A1515]">
                <div className="pt-4 fixed left-0 z-20 pl-0">
                    <div onClick={() => setSideTog(!sideTog)} className="bg-[#7A1515] px-5 py-2 font-semibold text-white rounded-md cursor-pointer" size={44}>
                        {!sideTog ? "Menu" : <RxCross1 />}
                    </div>
                </div>
                <Sidebar sideTog={sideTog} />
                <div className="flex justify-center w-full items-start pt-6">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="flex flex-col gap-3 md:px-0 px-3 justify-center items-center md:pt-20 pt-28 w-full">
                            <div className="py-4 md:w-1/3 w-full px-5 shadow-sm shadow-gray-700 border-gray-700 border bg-white rounded-md">
                                <div className="flex gap-3 border-b border-gray-700 pb-3 text-2xl justify-center items-center">
                                    <div className="font-semibold">Update User</div>
                                </div>
                                <div className="flex gap-3 pt-3 py-2 text-xl justify-start items-center">
                                    <div>Name:</div>
                                    <div>{userData.name}</div>
                                </div>
                                <div className="flex gap-3 py-2 text-xl justify-start items-center">
                                    <div>Email:</div>
                                    <div>{userData.email}</div>
                                </div>
                                <div className="flex gap-3 border-b border-gray-700 py-2 text-xl justify-start items-center">
                                    <div>Role:</div>
                                    <div>{userData.role}</div>
                                </div>
                                <div className="flex gap-3 pt-4 py-2 text-sm justify-start items-center">
                                    <select onChange={(e) => setRole(e.target.value)} id="role-select" className="block w-full px-6 py-2 text-base border bg-gray-900 border-gray-600 placeholder-gray-400 text-white rounded-md">
                                        <option value="not" selected>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="applicant">Applicant</option>
                                    </select>
                                </div>
                                <div className="flex gap-3 font-semibold py-2 text-sm">
                                    <button onClick={updateRoleHandler} className="bg-[#7A1515] px-6 w-full py-2 text-white rounded-md">
                                        Update Role
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
