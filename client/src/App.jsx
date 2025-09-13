import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Signup from './pages/signup';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
