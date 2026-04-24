import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Eligibility from './pages/Eligibility'
import Calculator from './pages/Calculator'
import LoanPreview from './pages/LoanPreview'
import Login from './pages/Login'
import EligibilityModal from './sections/EligibilityModal'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="eligibility" element={<Eligibility />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="loan-preview" element={<LoanPreview />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <EligibilityModal />
    </>
  )
}