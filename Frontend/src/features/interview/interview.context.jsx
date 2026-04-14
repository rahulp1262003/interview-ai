import { createContext, useState } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [interviewReport, setInterviewReport] = useState(null);
    const [reposts, setReposts] = useState([]);
    return (
        <InterviewContext.Provider value={{ loading, setLoading, interviewReport, setInterviewReport, reposts, setReposts }}>
            {children}
        </InterviewContext.Provider>
    )
}