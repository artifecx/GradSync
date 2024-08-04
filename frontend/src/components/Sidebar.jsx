import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { MdOutlineCreateNewFolder, MdOutlineFeaturedPlayList, MdOutlineDashboard } from 'react-icons/md'
import { BsBriefcase } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export const Sidebar = ({ sideTog }) => {

    const sidebarVariants = {
        hidden: {
            x: '-100%',
        },
        visible: {
            x: 0,
        },
    };

    return (
        <>
            <motion.div
                className={`${sideTog ? "flex" : "hidden"} flex-col bg-white shadow-md min-h-screen w-64 z-10 fixed left-0`}
                variants={sidebarVariants}
                initial="hidden"
                animate={sideTog ? "visible" : "hidden"}
                transition={{ duration: 0.1, ease: "easeIn" }}
            >
                <div className="pt-6 p-4 flex flex-col items-left text-[#6B6F73]">
                    <p className="text-s">Menu</p>
                    <ul className="w-full flex flex-col gap-4 pt-4">
                        <li>
                            <Link to="/admin/dashboard">
                                <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2 flex items-center gap-2">
                                    <MdOutlineDashboard size={20} /> Dashboard
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/postJob">
                                <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2 flex items-center gap-2">
                                    <MdOutlineCreateNewFolder size={20} /> Post Job
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allJobs">
                                <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2 flex items-center gap-2">
                                    <BsBriefcase size={20} /> View All Jobs
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allApplications">
                                <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2 flex items-center gap-2">
                                    <MdOutlineFeaturedPlayList size={20} /> View All Applications
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/allUsers">
                                <button className="bg-[#7A1515] w-full text-white rounded-md font-semibold px-5 py-2 flex items-center gap-2">
                                    <AiOutlineUser size={20} /> View All Users
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.div>
        </>
    )
}
