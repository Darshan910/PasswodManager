import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import Home from './pages/Home'
import Error from './pages/Error'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { TokenProvider } from './TokenContext'
// import OpenRoute from './components/OpenRoute'


function App() {
  const [count, setCount] = useState(0)
  return (
    <TokenProvider>
      {/* {alert(token)} */}

      <Navbar />
      <Routes>
        <Route index element={<Manager />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </TokenProvider>
  )
}

export default App
