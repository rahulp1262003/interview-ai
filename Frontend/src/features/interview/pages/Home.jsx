import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import { BriefcaseIcon, CloudArrowUpIcon, SparkleIcon, UserIcon } from '@phosphor-icons/react'

import '../styles/home.scss'
import { Icon as FileIcon } from '../components/FileIcon'
import { useInterview } from '../hooks/useInterview';

function Home() {
    const [fileName, setFileName] = useState("");
    const { loading, generateReport } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");

    const resumeRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    };

    const navigate = useNavigate();

    const handleGenerateReport = async (e) => {
        e.preventDefault();

        if (!jobDescription || !selfDescription || !resumeRef.current.files[0]) {
            alert("Fill all fields");
            return;
        }

        try {
            const data = await generateReport({
                jobDescription,
                selfDescription,
                resumeFile: resumeRef.current.files[0]
            });

            if (!data || !data._id) {
                alert("Failed to generate report. Try again.");
                return;
            }
            console.log("DATA:", data);
            console.log("ID:", data?._id);
            navigate(`/interview/reports/${data._id}`);

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    if (loading) {
        return (
            <main>
                <h2>Interview Plaing loading...</h2>
            </main>
        );
    }

    return (
        <main className='home'>
            <div className="header">
                <h1>Create Your Custom <span>Interview Plan</span></h1>
                <p>Get personalized interview preparation based on your resume and the job description.</p>
            </div>
            <div className="form-container">
                <form action="" >
                    <div className="form-content">
                        <div className="left">
                            <div className="targeted-job-des">
                                <BriefcaseIcon size={32} color="#007bff" />
                                <h2>Targeted Job Description</h2>
                            </div>
                            <textarea name="jobDescription" id="" placeholder='Paste Job Description here' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}></textarea>
                        </div>
                        <div className="right">
                            <div className="input-group">
                                <div className="profile">
                                    <UserIcon size={32} color="#007bff" />
                                    <h2>Your Profile</h2>
                                </div>
                                <label className="section-label">Upload Resume</label>
                                <div className="file-upload-wrapper">
                                    <input type="file" id="resume" accept='.pdf' name='resume' onChange={handleFileChange} ref={resumeRef} />
                                    <label htmlFor="resume" className="file-upload-label">
                                        {fileName ? (
                                            <span className="file-name"><FileIcon size={30} />{fileName}</span>
                                        ) : (
                                            <span>
                                                <span className="upload-icon">
                                                    <CloudArrowUpIcon size={64} color='#007bff' weight="duotone" />
                                                </span>
                                                <span className="upload-text">Upload Resume Here (PDF Only)</span>
                                            </span>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="selfDescription" className="section-label">Self Description</label>
                                <textarea name="selfDescription" id="" placeholder='Enter your self description' value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)}></textarea>
                            </div>

                        </div>
                    </div>
                    <div className='footer'>
                        <p>AI-Powerd Strategy Genaration - Approx 30 Sec</p>
                        <button type='submit' className='btn btn-primary' onClick={handleGenerateReport} disabled={loading}>
                            <SparkleIcon size={25} color="#ffffffff" weight="fill" />
                            Generate Interview Plan
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Home