import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import HomePage from './pages/homePage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login  />} />
      <Route path="/signup" element={<SignUp />} />
      
    </Routes>
  );
}

export default App;
