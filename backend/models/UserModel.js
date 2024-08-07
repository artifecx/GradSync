const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'recruiter', 'applicant'],
        required: true
    },
    skills: [
        {
            type: String
        }
    ],
    avatar: {
        public_id: {
            type: String,
            required: function() { return this.role === 'applicant' || this.role === 'admin'; }
        },
        url: {
            type: String,
            required: function() { return this.role === 'applicant' || this.role === 'admin'; }
        },
    },
    companyName: {
        type: String,
        required: function() { return this.role === 'recruiter'; }
    },
    companyLogo: {
        type: Object,
        required: function() { return this.role === 'recruiter'; }
    },
    resume: {
        type: Object,
        required: function() { return this.role === 'applicant'; }
    },
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        public_id: {
            type: String,
            required: function() { return this.role === 'applicant' || this.role === 'admin'; }
        },
        url: {
            type: String,
            required: function() { return this.role === 'applicant' || this.role === 'admin'; }
        },
    },
});

module.exports = mongoose.model('User', userSchema);
