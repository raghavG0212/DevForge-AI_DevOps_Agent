import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DashboardPage from '../pages/DashboardPage'
import { Toaster } from 'react-hot-toast'

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes