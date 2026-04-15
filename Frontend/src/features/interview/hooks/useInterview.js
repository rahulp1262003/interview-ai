import { useContext } from "react";
import { getInterviewReportById, getAllInterviewReports, generateInterviewReport } from "../services/interview.ai";
import { InterviewContext } from "../interview.context";
import { defaultInterviewReport } from "../interview.model";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error("The context must be used within an InterviewProvider");
    }

    const {
        interviewReport,
        setInterviewReport,
        reports,
        setReports,
        loading,
        setLoading
    } = context;

    // 🔥 normalize API response
    const normalizeReport = (data) => ({
        ...defaultInterviewReport,
        ...data,
        _id: data?._id || null
    });

    const generateReport = async (payload) => {
        try {
            setLoading(true);
            const res = await generateInterviewReport(payload);
            const normalized = normalizeReport(res.data);
            setInterviewReport(normalized);
            return normalized;
        } catch (err) {
            console.error("Generate error:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchReportById = async (id) => {
        try {
            setLoading(true);
            if (!id || typeof id !== "string") {
                console.error("Invalid ID:", id);
                return;
            }
            const res = await getInterviewReportById(id);
            const normalized = normalizeReport(res.data);
            setInterviewReport(normalized);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };


    const fetchAllReports = async () => {
        try {
            setLoading(true);
            const res = await getAllInterviewReports();
            const normalized = res.data.map(normalizeReport);
            setReports(normalized);
        } catch (err) {
            console.error("Fetch all error:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        reportData: interviewReport,
        reports,
        loading,
        generateReport,
        fetchReportById,
        fetchAllReports
    };
}