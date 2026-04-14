import { useContext } from "react";
import { getInterviewReportById, getAllInterviewReports, generateInterviewReport } from "../services/interview.ai";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("The context must be used within an InterviewProvider");
    }

    const { setInterviewReport, setInterviewReports, loading, setLoading } = context;

    const generatedInterviewReportByAI = async ({ jobDescription, selfDescription, resumeFile }) => {
        try {
            setLoading(true);
            const report = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setInterviewReport(report.data);
            return report.data;
        } catch (error) {
            console.error("Error generating interview report:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInterviewReportById = async ({ jobDescription, selfDescription, resumeFile }) => {
        try {
            setLoading(true);
            const report = await getInterviewReportById({ jobDescription, selfDescription, resumeFile });
            setInterviewReport(report.data);
            return report.data;
        } catch (error) {
            console.error("Error fetching interview report by ID:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchAllInterviewReports = async () => {
        try {
            setLoading(true)
            const reports = await getAllInterviewReports();
            setInterviewReports(reports);
            return reports;
        }
        catch (error) {
            console.error("Error fetching all interview reports:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        generatedInterviewReportByAI,
        fetchInterviewReportById,
        fetchAllInterviewReports,
        loading
    };
}