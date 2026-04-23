import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Protected({ children }) {
    const { loading, user } = useAuth();
    console.log('Protected check → loading:', loading, '| user:', user);
    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }
    return children;
}

export default Protected