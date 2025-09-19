import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './pages/Header';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Signup from './pages/signup';
import ProfilePage from './pages/ProfilePage';



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
        <Route path="/profilePage" element={<ProfilePage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
