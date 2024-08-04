const levenshtein = require('levenshtein');

function calculateSkillsMatch(applicantSkills, jobSkills) {
    const normalizedApplicantSkills = applicantSkills.map(skill => skill.toLowerCase());
    const normalizedJobSkills = jobSkills.map(skill => skill.toLowerCase());
    
    const matchingSkills = normalizedApplicantSkills.filter(applicantSkill => {
        return normalizedJobSkills.some(jobSkill => {
            const distance = new levenshtein(applicantSkill, jobSkill).distance;
            const maxLen = Math.max(applicantSkill.length, jobSkill.length);
            const similarity = 1 - (distance / maxLen);
            return similarity >= 0.8;
        });
    });
    
    return (matchingSkills.length / normalizedJobSkills.length) * 100;
}

function calculateDescriptionMatch(applicantSkills, jobDescription) {
    const jobDescriptionWords = jobDescription.toLowerCase().split(' ');
    const normalizedApplicantSkills = applicantSkills.map(skill => skill.toLowerCase());

    const matchingKeywords = normalizedApplicantSkills.filter(applicantSkill => {
        return jobDescriptionWords.some(jobWord => {
            const distance = new levenshtein(applicantSkill, jobWord).distance;
            const maxLen = Math.max(applicantSkill.length, jobWord.length);
            const similarity = 1 - (distance / maxLen);
            return similarity >= 0.8;
        });
    });

    return (matchingKeywords.length / jobDescriptionWords.length) * 100;
}

exports.calculateMatch = (applicant, jobListing) => {
    const weights = {
        skills: 1
    };

    const skillsMatch = calculateSkillsMatch(applicant.skills, jobListing.skills);
    // const jobDescriptionMatch = calculateDescriptionMatch(applicant.skills, jobListing.description);
    const overallMatch = (
        (skillsMatch * weights.skills)
    );

    return overallMatch;
}
