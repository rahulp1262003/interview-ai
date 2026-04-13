const express = require("express");
const interviewRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/file.middleware");
const interviewController = require("../controllers/interview.controller");

/**
 * @route POST /api/interview
 * @desc Generate interview report
 * @access Private
 */
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterviewReportByAI
);

module.exports = interviewRouter;