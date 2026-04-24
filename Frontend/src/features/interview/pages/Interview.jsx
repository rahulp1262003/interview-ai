import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import {
  ConfigProvider,
  theme,
  Tabs,
  Card,
  Tag,
  Progress,
  Statistic,
  Steps,
  Input,
  Spin,
  Typography,
  Row,
  Col,
  Space,
  Checkbox,
  Badge,
  Avatar,
  Dropdown,
} from 'antd'
import {
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AimOutlined,
  RobotOutlined,
  UserOutlined,
  BulbOutlined,
  CalendarOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useInterview } from '../hooks/useInterview'
import { useAuth } from '../../auth/hooks/useAuth'

const { Title, Text, Paragraph } = Typography

const severityConfig = {
  high: { color: 'error', label: 'High Priority', hex: '#ff4d4f' },
  medium: { color: 'warning', label: 'Medium Priority', hex: '#faad14' },
  low: { color: 'success', label: 'Low Priority', hex: '#52c41a' },
}

function Interview() {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const { reportData, loading, fetchReportById } = useInterview()
  const { user, handleLogout } = useAuth()

  const onLogout = async () => {
    try {
      await handleLogout()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  const profileMenuItems = [
    {
      key: 'info',
      label: (
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 600, color: '#e0e0e0', fontSize: 14 }}>{user?.username ?? 'User'}</div>
          <div style={{ color: '#888', fontSize: 12 }}>{user?.email ?? ''}</div>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: onLogout,
    },
  ]

  useEffect(() => {
    if (interviewId) fetchReportById(interviewId)
  }, [interviewId])

  const matchScore = reportData?.matchScore ?? 0

  const getScoreColor = (score) => {
    if (score >= 70) return '#52c41a'
    if (score >= 40) return '#faad14'
    return '#ff4d4f'
  }

  const tabItems = [
    {
      key: 'overview',
      label: (
        <Space>
          <AimOutlined />
          Overview
        </Space>
      ),
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Quick Stats */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card
                styles={{
                  body: { display: 'flex', alignItems: 'center', gap: 16 },
                }}
              >
                <BookOutlined style={{ fontSize: 32, color: '#1677ff' }} />
                <Statistic
                  title={<Text style={{ color: '#888' }}>Technical Q&A</Text>}
                  value={reportData?.technicalQuestions?.length ?? 0}
                  styles={{ content: { color: '#1677ff', fontWeight: 700 } }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                styles={{
                  body: { display: 'flex', alignItems: 'center', gap: 16 },
                }}
              >
                <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                <Statistic
                  title={<Text style={{ color: '#888' }}>Behavioral Q&A</Text>}
                  value={reportData?.behavioralQuestions?.length ?? 0}
                  valueStyle={{ color: '#52c41a', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                styles={{
                  body: { display: 'flex', alignItems: 'center', gap: 16 },
                }}
              >
                <ClockCircleOutlined style={{ fontSize: 32, color: '#faad14' }} />
                <Statistic
                  title={<Text style={{ color: '#888' }}>Days of Prep</Text>}
                  value={reportData?.preparationPlan?.length ?? 0}
                  valueStyle={{ color: '#faad14', fontWeight: 700 }}
                />
              </Card>
            </Col>
          </Row>

          {/* Skill Gaps */}
          <Card
            title={
              <Space>
                <AimOutlined style={{ color: '#1677ff' }} />
                <Title level={4} style={{ margin: 0, color: '#fff' }}>
                  Skill Gaps to Address
                </Title>
              </Space>
            }
          >
            <Row gutter={[12, 12]}>
              {reportData?.skillGap?.map((gap, idx) => {
                const cfg = severityConfig[gap.severity] ?? { color: 'default', label: 'Unknown', hex: '#1677ff' }
                return (
                  <Col key={idx} xs={24} sm={12} md={8}>
                    <Card
                      size="small"
                      style={{ borderColor: cfg.hex + '44', background: cfg.hex + '0d' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <Text strong style={{ color: '#e0e0e0', fontSize: 15 }}>
                          {gap.skill}
                        </Text>
                        <Tag color={cfg.color} style={{ fontWeight: 600 }}>
                          {cfg.label}
                        </Tag>
                      </div>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </Card>
        </div>
      ),
    },
    {
      key: 'technical',
      label: (
        <Space>
          <RobotOutlined />
          Technical Questions
        </Space>
      ),
      children: (
        <div>
          <Paragraph style={{ color: '#888', marginBottom: 20 }}>
            Questions designed to assess your technical expertise
          </Paragraph>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reportData?.technicalQuestions?.map((q, idx) => (
              <Card
                key={idx}
                style={{ borderColor: '#1677ff22' }}
                title={
                  <Space align="start">
                    <Badge
                      count={`Q${idx + 1}`}
                      style={{
                        backgroundColor: '#1677ff',
                        fontWeight: 700,
                        fontSize: 13,
                        borderRadius: 8,
                        padding: '0 10px',
                        minWidth: 44,
                      }}
                    />
                    <Text strong style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.5 }}>
                      {q.question}
                    </Text>
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size={12}>
                  <div>
                    <Text style={{ color: '#1677ff', fontWeight: 600 }}>Intention: </Text>
                    <Text style={{ color: '#aaa' }}>{q.intention}</Text>
                  </div>
                  <Input.TextArea
                    placeholder="Write your answer here..."
                    defaultValue={q.answer}
                    autoSize={{ minRows: 3, maxRows: 8 }}
                    style={{ background: '#111111', borderColor: '#2a2a2a', color: '#e0e0e0' }}
                  />
                </Space>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'behavioral',
      label: (
        <Space>
          <UserOutlined />
          Behavioral Questions
        </Space>
      ),
      children: (
        <div>
          <Paragraph style={{ color: '#888', marginBottom: 20 }}>
            Questions to assess your soft skills and work experience
          </Paragraph>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reportData?.behavioralQuestions?.map((q, idx) => (
              <Card
                key={idx}
                style={{ borderColor: '#52c41a22' }}
                title={
                  <Space align="start">
                    <Badge
                      count={`Q${idx + 1}`}
                      style={{
                        backgroundColor: '#52c41a',
                        fontWeight: 700,
                        fontSize: 13,
                        borderRadius: 8,
                        padding: '0 10px',
                        minWidth: 44,
                      }}
                    />
                    <Text strong style={{ color: '#e0e0e0', fontSize: 15, lineHeight: 1.5 }}>
                      {q.question}
                    </Text>
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }} size={12}>
                  <div>
                    <Text style={{ color: '#52c41a', fontWeight: 600 }}>Intention: </Text>
                    <Text style={{ color: '#aaa' }}>{q.intention}</Text>
                  </div>
                  <Input.TextArea
                    placeholder="Write your answer here..."
                    defaultValue={q.answer}
                    autoSize={{ minRows: 3, maxRows: 8 }}
                    style={{ background: '#111111', borderColor: '#2a2a2a', color: '#e0e0e0' }}
                  />
                </Space>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'preparation',
      label: (
        <Space>
          <CalendarOutlined />
          Preparation Plan
        </Space>
      ),
      children: (
        <Card
          title={
            <Space>
              <ClockCircleOutlined style={{ color: '#faad14' }} />
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                Your Preparation Plan
              </Title>
            </Space>
          }
        >
          <Steps
            orientation="vertical"
            current={-1}
            items={reportData?.preparationPlan?.map((plan, idx) => ({
              title: (
                <Space style={{ marginBottom: 4 }}>
                  <Text strong style={{ color: '#e0e0e0', fontSize: 16 }}>
                    {plan.day}
                  </Text>
                  <Tag color="blue" style={{ fontWeight: 600 }}>
                    {plan.focus}
                  </Tag>
                </Space>
              ),
              description: (
                <Space
                  direction="vertical"
                  size={8}
                  style={{ width: '100%', paddingBottom: 16 }}
                >
                  {plan.tasks?.map((task, taskIdx) => (
                    <Checkbox key={taskIdx} style={{ color: '#ccc', fontSize: 14 }}>
                      {task}
                    </Checkbox>
                  ))}
                </Space>
              ),
              icon: (
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1677ff, #003064)',
                    boxShadow: '0 0 12px rgba(22,119,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {idx + 1}
                </div>
              ),
            })) ?? []}
          />
        </Card>
      ),
    },
  ]

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          colorBgContainer: '#0d0d0d',
          colorBgElevated: '#141414',
          borderRadius: 12,
          colorBorder: '#2a2a2a',
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
        },
        components: {
          Card: {
            colorBgContainer: '#0d0d0d',
            borderRadius: 16,
          },
          Tabs: {
            colorBgContainer: 'transparent',
            itemSelectedColor: '#1677ff',
            inkBarColor: '#1677ff',
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
          gap: 24,
        }}
      >
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <Spin size="large" description="Loading your report..." />
          </div>
        ) : (
          <>
            {/* Profile Bar */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    background: '#141414',
                    border: '1px solid #2a2a2a',
                    borderRadius: 40,
                    padding: '6px 16px 6px 6px',
                    transition: 'border-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1677ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a2a')}
                >
                  <Avatar
                    size={36}
                    style={{
                      background: 'linear-gradient(135deg, #1677ff, #003a8c)',
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                    icon={!user?.username && <UserOutlined />}
                  >
                    {user?.username?.[0]?.toUpperCase()}
                  </Avatar>
                  <span style={{ color: '#e0e0e0', fontWeight: 500, fontSize: 14 }}>
                    {user?.username ?? 'User'}
                  </span>
                </div>
              </Dropdown>
            </div>

            {/* Header */}
            <Card>
              <Row align="middle" justify="space-between" gutter={[24, 24]}>
                <Col xs={24} md={16}>
                  <Space direction="vertical" size={4}>
                    <Text style={{ color: '#1677ff', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Interview Report
                    </Text>
                    <Title level={2} style={{ margin: 0, color: '#ffffff', lineHeight: 1.3 }}>
                      {reportData?.title ?? 'No Title'}
                    </Title>
                  </Space>
                </Col>
                <Col xs={24} md={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Progress
                      type="circle"
                      percent={matchScore}
                      size={130}
                      strokeColor={getScoreColor(matchScore)}
                      railColor="#2a3347"
                      strokeWidth={8}
                      format={(pct) => (
                        <div>
                          <div style={{ fontSize: 28, fontWeight: 700, color: getScoreColor(matchScore) }}>
                            {pct}%
                          </div>
                          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                            Match
                          </div>
                        </div>
                      )}
                    />
                  </div>
                </Col>
              </Row>
            </Card>

            {/* Tabs */}
            <Card style={{ flex: 1 }}>
              <Tabs
                defaultActiveKey="overview"
                items={tabItems}
                size="large"
                animated={{ inkBar: true, tabPane: true }}
              />
            </Card>
          </>
        )}
      </div>
    </ConfigProvider>
  )
}

export default Interview