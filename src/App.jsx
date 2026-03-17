import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DesktopPage from './pages/DesktopPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/os" element={<DesktopPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
