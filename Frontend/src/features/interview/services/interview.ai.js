import axios from 'axios';
const authApi = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
});

/**
 * @description Service to generate interview report from the server
 * @param {*} param0 
 * @returns return interview report data
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData();
        formData.append('jobDescription', jobDescription);
        formData.append('selfDescription', selfDescription);
        formData.append('resume', resumeFile);
        const response = await authApi.post('/api/interview/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching interview report:', error);
        throw error;
    }
}

/**
 * @description Service to get interview report by ID from the server
 * @param {*} interviewId
 * @return interview report data
 * */
export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await authApi.get(`/api/interview/reports/${interviewId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching interview report by ID:', error);
        throw error;
    }
}

/**
 * @description Service to get all interview reports for the authenticated user from the server
 * @return array of interview report data
 */
export const getAllInterviewReports = async () => {
    try {
        const response = await authApi.get('/api/interview/reports/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching all interview reports:', error);
        throw error;
    }
}