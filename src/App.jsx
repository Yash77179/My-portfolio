import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

const DesktopPage = React.lazy(() => import('./pages/DesktopPage'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/os" element={
          <Suspense fallback={<div className="h-screen w-screen bg-black" />}>
            <DesktopPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
