import React, { useState } from 'react'
import { BookmarkIcon, CheckCircleIcon, WarningCircleIcon, ClockIcon, TargetIcon } from '@phosphor-icons/react'
import '../styles/interview.scss'
import { useInterview } from '../hooks/useInterview'

function Interview() {
  const [activeTab, setActiveTab] = useState('overview');
  const { reportData } = useInterview();

  // Mock data - replace with actual data from props/context
  // const reportData = {
  //   title: "Senior Frontend Developer - Tech Corp",
  //   matchScore: 78,
  //   technicalQuestions: [
  //     {
  //       question: "Explain React hooks and their use cases",
  //       intention: "Assess understanding of React fundamentals",
  //       answer: ""
  //     },
  //     {
  //       question: "What is the difference between state and props?",
  //       intention: "Check React concepts knowledge",
  //       answer: ""
  //     },
  //     {
  //       question: "How do you handle state management in large applications?",
  //       intention: "Evaluate state management experience",
  //       answer: ""
  //     }
  //   ],
  //   behavioralQuestions: [
  //     {
  //       question: "Tell me about a time you faced a challenging project",
  //       intention: "Assess problem-solving skills",
  //       answer: ""
  //     },
  //     {
  //       question: "How do you handle conflicts with team members?",
  //       intention: "Evaluate teamwork and communication",
  //       answer: ""
  //     }
  //   ],
  //   skillGap: [
  //     { skill: "TypeScript", severity: "high" },
  //     { skill: "AWS", severity: "medium" },
  //     { skill: "Docker", severity: "low" }
  //   ],
  //   preparationPlan: [
  //     {
  //       day: "Day 1",
  //       focus: "React Fundamentals",
  //       tasks: ["Review hooks documentation", "Practice custom hooks", "Study useEffect lifecycle"]
  //     },
  //     {
  //       day: "Day 2",
  //       focus: "State Management",
  //       tasks: ["Learn Redux basics", "Practice Context API", "Study Redux Toolkit"]
  //     },
  //     {
  //       day: "Day 3",
  //       focus: "System Design",
  //       tasks: ["Study component architecture", "Learn design patterns", "Practice scalability concepts"]
  //     }
  //   ]
  // };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44bb44';
      default: return '#007bff';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Unknown';
    }
  };

  return (
    <main className='interview'>
      {/* Header Section */}
      <div className="interview-header">
        <div className="title-section">
          <h1>{reportData.title}</h1>
          <div className="match-score-container">
            <div className="match-score-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="score-bg" />
                <circle cx="50" cy="50" r="45" className="score-progress" style={{ strokeDashoffset: 283 - (reportData.matchScore / 100) * 283 }} />
              </svg>
              <div className="score-text">
                <span className="score-value">{reportData.matchScore}%</span>
                <span className="score-label">Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          Technical Questions
        </button>
        <button
          className={`tab ${activeTab === 'behavioral' ? 'active' : ''}`}
          onClick={() => setActiveTab('behavioral')}
        >
          Behavioral Questions
        </button>
        <button
          className={`tab ${activeTab === 'preparation' ? 'active' : ''}`}
          onClick={() => setActiveTab('preparation')}
        >
          Preparation Plan
        </button>
      </div>

      {/* Content Sections */}
      <div className="content-wrapper">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="overview-section">
            {/* Skill Gaps */}
            <div className="skill-gaps-container">
              <div className="section-header">
                <TargetIcon size={32} color="#007bff" weight="duotone" />
                <h2>Skill Gaps to Address</h2>
              </div>
              <div className="skill-gaps-grid">
                {reportData.skillGap.map((gap, idx) => (
                  <div key={idx} className="skill-gap-card">
                    <div className="skill-gap-header">
                      <h3>{gap.skill}</h3>
                      <span className="severity-badge" style={{ backgroundColor: getSeverityColor(gap.severity) }}>
                        {getSeverityLabel(gap.severity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <div className="stat-card">
                <BookmarkIcon size={24} color="#007bff" />
                <div className="stat-content">
                  <span className="stat-value">{reportData.technicalQuestions.length}</span>
                  <span className="stat-label">Technical Q&A</span>
                </div>
              </div>
              <div className="stat-card">
                <CheckCircleIcon size={24} color="#007bff" />
                <div className="stat-content">
                  <span className="stat-value">{reportData.behavioralQuestions.length}</span>
                  <span className="stat-label">Behavioral Q&A</span>
                </div>
              </div>
              <div className="stat-card">
                <ClockIcon size={24} color="#007bff" />
                <div className="stat-content">
                  <span className="stat-value">{reportData.preparationPlan.length}</span>
                  <span className="stat-label">Days of Prep</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Technical Questions Tab */}
        {activeTab === 'technical' && (
          <section className="questions-section">
            <div className="section-header">
              <h2>Technical Interview Questions</h2>
              <p>Questions designed to assess your technical expertise</p>
            </div>
            <div className="questions-list">
              {reportData.technicalQuestions.map((q, idx) => (
                <div key={idx} className="question-card">
                  <div className="question-number">Q{idx + 1}</div>
                  <div className="question-content">
                    <h3>{q.question}</h3>
                    <div className="question-meta">
                      <span className="intention">
                        <strong>Intention:</strong> {q.intention}
                      </span>
                    </div>
                    <textarea
                      placeholder="Write your answer here..."
                      className="answer-input"
                      defaultValue={q.answer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Behavioral Questions Tab */}
        {activeTab === 'behavioral' && (
          <section className="questions-section">
            <div className="section-header">
              <h2>Behavioral Interview Questions</h2>
              <p>Questions to assess your soft skills and work experience</p>
            </div>
            <div className="questions-list">
              {reportData.behavioralQuestions.map((q, idx) => (
                <div key={idx} className="question-card">
                  <div className="question-number">Q{idx + 1}</div>
                  <div className="question-content">
                    <h3>{q.question}</h3>
                    <div className="question-meta">
                      <span className="intention">
                        <strong>Intention:</strong> {q.intention}
                      </span>
                    </div>
                    <textarea
                      placeholder="Write your answer here..."
                      className="answer-input"
                      defaultValue={q.answer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Preparation Plan Tab */}
        {activeTab === 'preparation' && (
          <section className="preparation-section">
            <div className="section-header">
              <ClockIcon size={32} color="#007bff" weight="duotone" />
              <h2>Your Preparation Plan</h2>
            </div>
            <div className="preparation-timeline">
              {reportData.preparationPlan.map((plan, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker">
                    <div className="marker-dot" />
                    {idx !== reportData.preparationPlan.length - 1 && <div className="marker-line" />}
                  </div>
                  <div className="timeline-content">
                    <div className="day-header">
                      <h3>{plan.day}</h3>
                      <span className="focus-tag">{plan.focus}</span>
                    </div>
                    <ul className="tasks-list">
                      {plan.tasks.map((task, taskIdx) => (
                        <li key={taskIdx}>
                          <input type="checkbox" id={`task-${idx}-${taskIdx}`} />
                          <label htmlFor={`task-${idx}-${taskIdx}`}>{task}</label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn btn-secondary">Save Progress</button>
        <button className="btn btn-primary">Submit Interview</button>
      </div>
    </main>
  )
}

export default Interview