import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './hooks/useAuth.jsx'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import MessagePage from './components/MessagePage'
import PaymentPage from './components/PaymentPage'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/message/:username" element={<MessagePage />} />
            <Route path="/payment/:messageId" element={<PaymentPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
