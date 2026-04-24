const { PDFParse } = require("pdf-parse");
const { default: mongoose } = require("mongoose");

const { verifyPDFBuffer } = require("../middlewares/file.middleware");
const interviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/ai.service");

/**
 * @name generateInterviewReportByAI
 * @desc Generate interview report using AI based on resume, self description and job description
 * @route POST /api/interview
 * @access Private
 */
const generateInterviewReportByAI = async (req, res) => {
    try {

        const pdfFile = req.file;

        if (!pdfFile) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required"
            });
        }
        // Magic bytes verify karo
        if (!verifyPDFBuffer(pdfFile.buffer)) {
            return res.status(400).json({ success: false, message: "Invalid PDF file" });
        }

        const pdfContent = await (new PDFParse(Uint8Array.from(pdfFile.buffer))).getText();

        if (!pdfContent) {
            return res.status(400).json({
                success: false,
                message: "Failed to parse PDF content"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Self description and job description are required"
            });
        }

        const interviwReportByAI = await generateInterviewReport({ resume: pdfContent.text, selfDescription, jobDescription });

        const interviewReport = await interviewReportModel.create({
            resume: pdfContent.text,
            selfDescription: selfDescription,
            jobDescription: jobDescription,
            ...interviwReportByAI,
            user: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "Interview report generated successfully",
            data: interviewReport
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate interview report"
        });
    }
}

/**
 * @name getInterviewReportById
 * @desc Get interview report by ID
 * @route GET /api/interview/:interviewId
 * @access Private
 */
const getInterviewReportById = async (req, res) => {
    try {
        const { interviewId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid interview ID"
            });
        }

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview report found",
            data: interviewReport
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch interview report"
        });
    }

}

/**
 * 
 */
const getAllInterviewReports = async (req, res) => {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-__v -selfDescription -jobDescription -resume -behavioralQuestions -skillGap -preparationPlan");

        res.status(200).json({
            success: true,
            message: "Interview reports found",
            data: interviewReports
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch interview reports"
        });
    }
};

/** 
 * @name deleteInterviewReport
 * @desc Delete interview report
 * @route DELETE /api/interview/:interviewId
 * @access Private
 */
const deleteInterviewReport = async (req, res) => {
    try {
        const { interviewId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(interviewId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid interview ID"
            });
        }

        const interviewReport = await interviewReportModel.findOneAndDelete({
            _id: interviewId,
            user: req.user.id
        });

        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Interview report deleted successfully",
            data: {
                id: interviewReport._id,
                title: interviewReport.title,
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete interview report"
        });
    }
};

module.exports = {
    generateInterviewReportByAI,
    getInterviewReportById,
    getAllInterviewReports,
    deleteInterviewReport
}