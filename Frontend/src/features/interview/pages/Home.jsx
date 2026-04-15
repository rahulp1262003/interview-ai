import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
  ConfigProvider,
  theme,
  Card,
  Button,
  Input,
  Typography,
  Space,
  Row,
  Col,
  Spin,
  Upload,
  message,
  List,
  Avatar,
  Tag,
  Empty,
  Divider,
} from 'antd'
import {
  ThunderboltOutlined,
  InboxOutlined,
  FileTextOutlined,
  UserOutlined,
  BulbOutlined,
  ArrowRightOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { useInterview } from '../hooks/useInterview'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Dragger } = Upload

function Home() {
  const [jobDescription, setJobDescription] = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const { loading, generateReport, reports, fetchAllReports } = useInterview()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAllReports()
  }, [])

  const handleGenerateReport = async () => {
    if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
      message.warning('Please fill in all fields and upload your resume.')
      return
    }
    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })
      if (!data || !data._id) {
        message.error('Failed to generate report. Try again.')
        return
      }
      navigate(`/interview/reports/${data._id}`)
    } catch (err) {
      console.error(err)
      message.error('Something went wrong.')
    }
  }

  const uploadProps = {
    accept: '.pdf',
    beforeUpload: (file) => {
      setResumeFile(file)
      message.success(`${file.name} selected`)
      return false // prevent auto upload
    },
    onRemove: () => {
      setResumeFile(null)
    },
    maxCount: 1,
    multiple: false,
    showUploadList: true,
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          colorBgContainer: '#0d0d0d',
          colorBgElevated: '#141414',
          borderRadius: 16,
          colorBorder: '#2a2a2a',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        },
        components: {
          Card: {
            colorBgContainer: '#0d0d0d',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          },
          Input: {
            colorBgContainer: '#111111',
            activeBorderColor: '#1677ff',
          },
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: '#000000',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Space align="center" style={{ marginBottom: 16 }}>
            <div style={{ padding: '8px 16px', background: '#1677ff15', borderRadius: 30, border: '1px solid #1677ff30' }}>
              <Space>
                <ThunderboltOutlined style={{ color: '#1677ff' }} />
                <Text style={{ color: '#1677ff', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
                  AI-Powered Strategy
                </Text>
              </Space>
            </div>
          </Space>
          <Title
            level={1}
            style={{ margin: '8px 0', color: '#ffffff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
          >
            Nail Your Next <span style={{ color: '#1677ff' }}>Interview</span>
          </Title>
          <Paragraph style={{ color: '#888', fontSize: 18, maxWidth: 640, margin: '16px auto 0', lineHeight: 1.6 }}>
            Upload your resume and the job description. Our AI will generate a personalized preparation plan in seconds.
          </Paragraph>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <Row gutter={[32, 32]}>
            {/* Left Column — Your Profile */}
            <Col xs={24} md={10}>
              <Space direction="vertical" style={{ width: '100%' }} size={32}>
                <Card
                  title={
                    <Space>
                      <UserOutlined style={{ color: '#1677ff' }} />
                      <span>Your Profile</span>
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }} size={24}>
                    <div>
                      <Text strong style={{ display: 'block', marginBottom: 12, color: '#e0e0e0' }}>
                        Resume Upload (PDF)
                      </Text>
                      <Dragger {...uploadProps} style={{ background: '#0a0a0a', border: '1px dashed #333' }}>
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined style={{ color: '#1677ff' }} />
                        </p>
                        <p className="ant-upload-text" style={{ color: '#ccc' }}>Click or drag PDF to this area</p>
                        <p className="ant-upload-hint" style={{ color: '#666' }}>Upload your latest professional resume</p>
                      </Dragger>
                    </div>

                    <div>
                      <Text strong style={{ display: 'block', marginBottom: 12, color: '#e0e0e0' }}>
                        Self Description
                      </Text>
                      <TextArea
                        placeholder="Briefly share your core strengths or specific focus areas..."
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        autoSize={{ minRows: 4, maxRows: 6 }}
                        style={{ background: '#111111', borderColor: '#2a2a2a', color: '#e0e0e0' }}
                      />
                    </div>
                  </Space>
                </Card>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<ThunderboltOutlined />}
                  loading={loading}
                  onClick={handleGenerateReport}
                  style={{
                    height: 60,
                    fontSize: 18,
                    fontWeight: 700,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #1677ff, #003064)',
                    boxShadow: '0 8px 16px rgba(22, 119, 255, 0.2)',
                  }}
                >
                  Generate Plan
                </Button>
              </Space>
            </Col>

            {/* Right Column — Job Description */}
            <Col xs={24} md={14}>
              <Card
                title={
                  <Space>
                    <FileTextOutlined style={{ color: '#1677ff' }} />
                    <span>Targeted Job Description</span>
                  </Space>
                }
                style={{ height: '100%' }}
                styles={{ body: { height: 'calc(100% - 56px)', display: 'flex', flexDirection: 'column' } }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Text style={{ display: 'block', marginBottom: 12, color: '#888' }}>
                    Paste the full job description below for the best results.
                  </Text>
                  <TextArea
                    placeholder="Paste job title, responsibilities, and requirements here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    style={{
                      flex: 1,
                      minHeight: 380,
                      background: '#111111',
                      borderColor: '#2a2a2a',
                      color: '#e0e0e0',
                      fontSize: 15,
                      padding: 16,
                    }}
                  />
                </div>
              </Card>
            </Col>
          </Row>

          <Divider style={{ borderColor: '#222', margin: '64px 0 48px' }} />

          {/* Recent Reports */}
          <Title level={3} style={{ marginBottom: 24, color: '#fff', textAlign: 'center' }}>
            Recent <span style={{ color: '#1677ff' }}>Reports</span>
          </Title>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
              <Spin size="large" />
            </div>
          ) : reports.length === 0 ? (
            <Empty description={<Text style={{ color: '#444' }}>No reports found yet.</Text>} />
          ) : (
            <Row gutter={[24, 24]}>
              {reports.slice(0, 6).map((report) => (
                <Col xs={24} sm={12} lg={8} key={report._id}>
                  <Card
                    hoverable
                    onClick={() => navigate(`/interview/reports/${report._id}`)}
                    style={{ background: '#0d0d0d', border: '1px solid #222' }}
                    styles={{ body: { padding: 20 } }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Space size={12}>
                        <Avatar
                          icon={<FileOutlined />}
                          style={{ background: '#1677ff15', color: '#1677ff' }}
                        />
                        <div>
                          <Text strong style={{ color: '#e0e0e0', display: 'block', fontSize: 15 }}>
                            {report.title?.length > 25 ? `${report.title.slice(0, 25)}...` : report.title}
                          </Text>
                          <Text style={{ color: '#555', fontSize: 12 }}>Match Score: {report.matchScore}%</Text>
                        </div>
                      </Space>
                      <ArrowRightOutlined style={{ color: '#1677ff', opacity: 0.5 }} />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Home