const Job = require('../models/JobModel')
const User = require('../models/UserModel')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose');


exports.createJob = async (req, res) => {
    const { title, description, location, skillsRequired, category, employmentType, experience, salary } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: 'Only recruiters can add job listings' });
        }

        const job = await Job.create({
            title,
            description,
            location,
            skillsRequired,
            category,
            employmentType,
            experience,
            salary,
            postedBy: userId
        });

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (error) {
        next(error);
    }
}


exports.allJobs = async (req, res) => {
    try {

        const Jobs = await Job.find();

        res.status(200).json({
            success: true,
            Jobs
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.oneJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy');

        res.status(200).json({
            success: true,
            job
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.saveJob = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        const JobId = req.params.id;

        if (user.savedJobs.includes(JobId)) {

            const jobIdObjectId = new mongoose.Types.ObjectId(JobId); 
            const arr = user.savedJobs.filter(jobid => jobid.toString() !== jobIdObjectId.toString());

            user.savedJobs = arr;
            await user.save();

            res.status(200).json({
                success: true,
                message: "Job UnSaved"
            })

        } else {
            const jobIdObjectId = new mongoose.Types.ObjectId(JobId); 
            user.savedJobs.push(jobIdObjectId);
            await user.save();
            res.status(200).json({
                success: true,
                message: "Job saved"
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getSavedJobs = async (req,res) => {
    try{

        const user = await User.findById(req.user._id).populate('savedJobs'); ;
      


        res.status(200).json({
            success: true,
            savedJob: user.savedJobs
        })



    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}