import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Eligibility from './pages/Eligibility'
import LoanPreview from './pages/LoanPreview'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="eligibility" element={<Eligibility />} />
        <Route path="loan-preview" element={<LoanPreview />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}