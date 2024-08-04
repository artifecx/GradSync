import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { getJobData, updateJobData } from '../actions/AdminActions';
import { Sidebar } from '../components/Sidebar';
import { RxCross1 } from 'react-icons/rx';
import { MdOutlineLocationOn, MdOutlineFeaturedPlayList, MdOutlineWorkOutline, MdWorkspacesOutline, MdAttachMoney, MdOutlineReceiptLong } from 'react-icons/md';
import { TbLoader2 } from 'react-icons/tb';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';

export const EditJobAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, jobData } = useSelector(state => state.admin);
  const [sideTog, setSideTog] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [logo, setLogo] = useState("");
  const [logoName, setLogoName] = useState("Select New Logo");

  useEffect(() => {
    dispatch(getJobData(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (jobData) {
      setTitle(jobData.title);
      setDescription(jobData.description);
      setCompanyName(jobData.companyName);
      setLocation(jobData.location);
      setSkillsRequired(jobData.skillsRequired.join(", "));
      setExperience(jobData.experience);
      setSalary(jobData.salary);
      setCategory(jobData.category);
      setEmploymentType(jobData.employmentType);
      setLogo(jobData.companyLogo.url);
    }
  }, [jobData]);

  const logoChange = (e) => {
    if (e.target.name === "logo") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogo(reader.result);
          setLogoName(e.target.files[0].name);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateJobHandler = (e) => {
    e.preventDefault();
    let skillsArr = skillsRequired.split(",").map(skill => skill.trim());
    
    if (logo.includes("cloudinary")) {
      toast.info("Please select new logo!");
    } else {
      const updatedData = {
        title,
        companyName,
        location,
        skillsRequired: skillsArr,
        experience,
        salary,
        category,
        employmentType,
        companyLogo: logo,
        description
      };
      dispatch(updateJobData(id, updatedData));
    }
  };

  return (
    <>
      <MetaData title="Edit Job Details" />
      <div className="bg-white min-h-screen pt-12 md:px-20 px-3 text-[#7A1515]">
        <div className="pt-4 fixed left-0 z-20 pl-0">
          <div onClick={() => setSideTog(!sideTog)} className="bg-[#7A1515] px-5 py-2 font-semibold text-white rounded-md" size={44}>
            {!sideTog ? "Menu" : <RxCross1 />}
          </div>
        </div>
        <Sidebar sideTog={sideTog} />
        <div className="flex justify-center w-full items-start pt-6">
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={updateJobHandler} className="flex flex-col w-full md:mx-0 mx-8 p-8 bg-white rounded-md shadow-md" style={{ maxWidth: '800px', width: '100%' }}>
              <div className="text-4xl pb-4 font-medium border-b border-gray-500 w-full">Edit Job Details</div>
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
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <div className="flex items-center gap-4 my-4">
                <div className="flex items-center">
                  {logo ? (
                    <img src={logo} alt="Company Logo" className="w-16 h-16 object-cover" />
                  ) : (
                    <MdOutlineFeaturedPlayList size={40} />
                  )}
                </div>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={logoChange}
                  className="hidden"
                  id="upload-logo"
                />
                <label htmlFor="upload-logo" className="cursor-pointer bg-[#7A1515] px-4 py-2 font-semibold text-white rounded-md">
                  {logoName}
                </label>
              </div>
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
                <button className="bg-[#7A1515] px-5 py-2 font-semibold text-white rounded-md" disabled={loading}>
                  {loading ? <TbLoader2 className="animate-spin" size={24} /> : "Edit Job"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
