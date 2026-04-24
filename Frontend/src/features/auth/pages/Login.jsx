import React from 'react'
import { Link, useNavigate } from 'react-router'
import {
  ConfigProvider,
  theme,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
} from 'antd'
import {
  MailOutlined,
  LockOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { useAuth } from '../hooks/useAuth'
import Paragraph from 'antd/es/skeleton/Paragraph'
import { App } from 'antd'

const { Title, Text } = Typography

const Login = () => {
  const { loading, handleLogin } = useAuth()
  const navigate = useNavigate()
  const { message } = App.useApp();

  const onFinish = async (values) => {
    try {
      await handleLogin(values)
      message.success('Login successful!')
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      message.error(error.response.data.message)
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          colorBgContainer: '#0d0d0d',
          borderRadius: 12,
          colorBorder: '#2a2a2a',
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Card
          style={{ width: '100%', maxWidth: 400, border: '1px solid #222', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          styles={{ body: { padding: '40px 32px' } }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Space align="center" style={{ marginBottom: 12 }}>
              <ThunderboltOutlined style={{ fontSize: 24, color: '#1677ff' }} />
              <Title level={2} style={{ margin: 0, fontWeight: 800 }}>
                Login<span style={{ color: '#1677ff' }}>.</span>
              </Title>
            </Space>
            <Paragraph style={{ color: '#555' }}>Welcome back to Interview AI</Paragraph>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={<Text style={{ color: '#aaa', fontSize: 13 }}>Email Address</Text>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#555' }} />}
                placeholder="email@example.com"
                style={{ height: 45, background: '#111', borderColor: '#2a2a2a' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<Text style={{ color: '#aaa', fontSize: 13 }}>Password</Text>}
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#555' }} />}
                placeholder="••••••••"
                style={{ height: 45, background: '#111', borderColor: '#2a2a2a' }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{
                  height: 45,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #1677ff, #003064)',
                  border: 'none',
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Text style={{ color: '#555' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#1677ff', fontWeight: 500 }}>
                Register Now
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  )
}

export default Login