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

/**
 * @rute GET /api/interview/:interviewId
 * @desc Get interview report by ID
 * @access Private
 */
interviewRouter.get(
    "/reports/:interviewId",
    authMiddleware.authUser,
    interviewController.getInterviewReportById
);

/**
 * @route GET /api/interview
 * @desc Get all interview reports for the authenticated user
 * @access Private
 * */
interviewRouter.get(
    "/reports/all",
    authMiddleware.authUser,
    interviewController.getAllInterviewReports
);

module.exports = interviewRouter;