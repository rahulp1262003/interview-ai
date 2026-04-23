import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.scss'
import { App as AntdApp } from 'antd'
createRoot(document.getElementById('root')).render(

  <AntdApp>
    <App />
  </AntdApp>
)
