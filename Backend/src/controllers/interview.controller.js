const { PDFParse } = require("pdf-parse");
const interviewReportModel = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/ai.service");

const generateInterviewReportByAI = async (req, res) => {
    try {

        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required"
            });
        }

        const resumeContent = await (new PDFParse(Uint8Array.from(resumeFile.buffer))).getText();

        if (!resumeContent) {
            return res.status(400).json({
                success: false,
                message: "Failed to parse resume content"
            });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!selfDescription || !jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Self description and job description are required"
            });
        }

        const interviwReportByAI = await generateInterviewReport({resume:resumeContent.text, selfDescription, jobDescription});

        const interviewReport = await interviewReportModel.create({
            resume: resumeContent.text,
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
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to generate interview report"
        });
    }
}

module.exports = {
    generateInterviewReportByAI
}