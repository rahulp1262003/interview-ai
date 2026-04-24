import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ConfigProvider,
  theme,
  Card,
  Button,
  Input,
  Typography,
  Space,
  Avatar,
  Divider,
  Modal,
  message,
} from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { useAuth } from '../../auth/hooks/useAuth'

const { Title, Text } = Typography

function Settings() {
  const navigate = useNavigate()
  const { user, handleLogout, handleDeleteAccount } = useAuth()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false)

  const onLogout = async () => {
    try {
      await handleLogout()
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err)
      message.error('Logout failed. Please try again.')
    }
  }

  const onDeleteAccount = async () => {
    if (!password.trim()) {
      message.warning('Please enter your password to confirm.')
      return
    }
    setDeleteLoading(true)
    try {
      await handleDeleteAccount({ password })
      message.success('Account deleted successfully.')
      setIsDeleteModalOpen(false)
      navigate('/login')
    } catch (err) {
      console.error('Delete failed', err)
      message.error(err?.response?.data?.message || 'Failed to delete account.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setPassword('')
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
          alignItems: 'center',
        }}
      >
        {/* Back Button */}
        <div style={{ width: '100%', maxWidth: 600, marginBottom: 24 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            style={{
              color: '#888',
              fontSize: 15,
              fontWeight: 500,
              padding: '4px 0',
            }}
          >
            Back to Home
          </Button>
        </div>

        {/* Page Title */}
        <div style={{ width: '100%', maxWidth: 600, marginBottom: 32 }}>
          <Title level={2} style={{ margin: 0, color: '#ffffff' }}>
            Settings
          </Title>
          <Text style={{ color: '#666', fontSize: 15 }}>
            Manage your account preferences
          </Text>
        </div>

        {/* Profile Card */}
        <Card
          style={{ width: '100%', maxWidth: 600, marginBottom: 20 }}
        >
          <Space size={20} align="center">
            <Avatar
              size={64}
              style={{
                background: 'linear-gradient(135deg, #1677ff, #003a8c)',
                fontWeight: 700,
                fontSize: 26,
              }}
              icon={!user?.username && <UserOutlined />}
            >
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>
            <div>
              <Title level={4} style={{ margin: 0, color: '#fff' }}>
                {user?.username ?? 'User'}
              </Title>
              <Space size={6} style={{ marginTop: 4 }}>
                <MailOutlined style={{ color: '#555', fontSize: 13 }} />
                <Text style={{ color: '#888', fontSize: 14 }}>
                  {user?.email ?? 'No email'}
                </Text>
              </Space>
            </div>
          </Space>
        </Card>

        {/* Account Actions */}
        <Card
          title={
            <Text strong style={{ color: '#e0e0e0', fontSize: 16 }}>
              Account
            </Text>
          }
          style={{ width: '100%', maxWidth: 600, marginBottom: 20 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <Text strong style={{ color: '#e0e0e0', display: 'block', fontSize: 15 }}>
                Sign Out
              </Text>
              <Text style={{ color: '#666', fontSize: 13 }}>
                Log out of your account on this device
              </Text>
            </div>
            <Button
              icon={<LogoutOutlined />}
              onClick={onLogout}
              style={{
                borderColor: '#333',
                color: '#e0e0e0',
                fontWeight: 500,
              }}
            >
              Logout
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card
          title={
            <Space>
              <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
              <Text strong style={{ color: '#ff4d4f', fontSize: 16 }}>
                Danger Zone
              </Text>
            </Space>
          }
          style={{
            width: '100%',
            maxWidth: 600,
            borderColor: '#ff4d4f22',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, marginRight: 16 }}>
              <Text strong style={{ color: '#e0e0e0', display: 'block', fontSize: 15 }}>
                Delete Account
              </Text>
              <Text style={{ color: '#666', fontSize: 13 }}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </Text>
            </div>
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalOpen(true)}
              style={{ fontWeight: 600 }}
            >
              Delete
            </Button>
          </div>
        </Card>
      </div>

      {/* Delete Account Modal */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
            <span style={{ color: '#fff', fontWeight: 600 }}>Delete Account</span>
          </Space>
        }
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        centered
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            loading={deleteLoading}
            onClick={onDeleteAccount}
            icon={<DeleteOutlined />}
          >
            Delete My Account
          </Button>,
        ]}
        styles={{
          content: { backgroundColor: '#141414' },
          header: { backgroundColor: '#141414' },
        }}
      >
        <div style={{ padding: '8px 0' }}>
          <Text style={{ color: '#ccc', display: 'block', marginBottom: 16, lineHeight: 1.6 }}>
            This will permanently delete your account, all your interview reports, and any associated data.
            This action <Text strong style={{ color: '#ff4d4f' }}>cannot be undone</Text>.
          </Text>
          <Text strong style={{ color: '#e0e0e0', display: 'block', marginBottom: 8 }}>
            Enter your password to confirm:
          </Text>
          <Input.Password
            prefix={<LockOutlined style={{ color: '#555' }} />}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={onDeleteAccount}
            size="large"
            style={{
              background: '#111111',
              borderColor: '#2a2a2a',
            }}
          />
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default Settings