const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resumeName: {
        type: String,
        required: true
    },
    resumePath: {
        type: String,
        required: true
    },
    matchPercentage: Number,
    matchedSkills: [String],
    missingSkills: [String],
    skillBreakdown: {
        programming: Number,
        frameworks: Number,
        tools: Number,
        softSkills: Number
    },
    suggestions: [String],
    learningLinks: {
        type: Map,
        of: String
    },
    jobTitle: String,
    companyName: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analysis', analysisSchema);
