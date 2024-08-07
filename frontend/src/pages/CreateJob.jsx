import React, { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { Sidebar } from '../components/Sidebar';
import { TbLoader2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { createJobPost } from '../actions/JobActions';
import { RxCross1 } from 'react-icons/rx';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export const CreateJob = () => {
  const { loading } = useSelector(state => state.job);

  const [sideTog, setSideTog] = useState(false);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const postHandler = (e) => {
    e.preventDefault();
    const skillsArr = skillsRequired.split(",");
    const data = { title, description, location, skillsRequired: skillsArr, experience, salary, category, employmentType };

    dispatch(createJobPost(data));
  };

  return (
    <>
      <MetaData title="Post Job" />
      <div className='bg-white min-h-screen pt-14 flex relative'>
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

        {/* Sidebar Toggle Button */}
        <div className="pt-4 fixed left-0 z-40 pl-0">
          <div
            onClick={() => setSideTog(!sideTog)}
            className="cursor-pointer bg-[#7A1515] text-white px-4 py-2 rounded-md flex items-center"
          >
            {!sideTog ? "Menu" : <RxCross1 />}
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 pl-6 pr-4 py-4 ${sideTog ? 'ml-64' : ''}`}>
          <div className="flex justify-center w-full items-start pt-6">
            <form onSubmit={postHandler} className="flex flex-col w-full md:mx-0 mx-8 p-8 bg-white rounded-md shadow-md" style={{ maxWidth: '800px', width: '100%' }}>
              <div className="text-4xl pb-4 font-medium border-b border-gray-500 w-full">Post Job</div>
              <TextField
                label="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Required Skills"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  required
                >
                  <MenuItem value=""><em>Select Category</em></MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Legal">Legal</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Employment Type</InputLabel>
                <Select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  label="Employment Type"
                  required
                >
                  <MenuItem value=""><em>Select Employment Type</em></MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
              <div className="flex justify-center w-full">
                <button className="bg-[#7A1515] text-white w-full md:w-[20rem] justify-center items-center flex px-4 py-2 mt-4">
                  {loading ? <TbLoader2 className="animate-spin" size={24} /> : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
