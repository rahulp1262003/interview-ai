const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score 0 to 100 including  how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover, what approach to tack etc."),
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question,what points to cover, what approach to tack etc."),
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, i.e. how imposrtent is this skill for the job"),
    })).describe("List of skill gaps between the candidate's profile and the job description along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.string().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus in this day in the preparation plan,e.g. Data Structures and Algorithms, system design, mock interviews, etc."),
        tasks: z.array(z.string().describe("List of tasks to be done on this day to follow the preparation plan, e.g,read a specific book or website, practice a specific topic, etc.")),
    })).describe("A day wise plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which interview report is generated"),
})

const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {
    const prompt = ` Generate an interview report for a candidate with the following details:
    
                **Resume:**
                ${resume}
                
                **Self-Description:**
                ${selfDescription}
                
                **Job Description:**
                ${jobDescription}
`;

    console.log("Prompt : ", prompt);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema),
        },
    });
    console.log("\nResponse from AI : ", response.text);
    return JSON.parse(response.text);
};

module.exports = { generateInterviewReport };