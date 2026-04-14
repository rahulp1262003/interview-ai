const mongoose = require('mongoose');
const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    },

}, {
    _id: false,
});

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    },

}, {
    _id: false,
});

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: [true, 'Severity is required']
    },

}, {
    _id: false,
});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, 'Day is required']
    },
    focus: {
        type: String,
        required: [true, 'Focus is required']
    },
    tasks: [{
        type: String,
        required: [true, 'Task is required']
    }]

}, {
    _id: false,
});

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'Job Description is required']
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: [0, 'Match Score must be greater than or equal to 0'],
        max: [100, 'Match Score must be less than or equal to 100']
    },
    technicalQuestions: {
        type: [technicalQuestionsSchema],
        default: []
    },
    behavioralQuestions: {
        type: [behavioralQuestionsSchema],
        default: []
    },
    skillGap: {
        type: [skillGapSchema],
        default: []
    },
    preparationPlan: {
        type: [preparationPlanSchema],
        default: []
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User is required']
    }
});

module.exports = mongoose.model('InterviewReportModel', interviewReportSchema);