import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import HomePage from './pages/homePage';
import { authStore } from '../../../packages/store/src';




function App() {
  const token = authStore((state) => state.token);
  const checkingAuth = authStore((state) => state.checkingAuth);
  const checkAuth = authStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={token ? <HomePage /> : <Navigate replace to="/login" />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate replace to="/" />} />
      <Route path="/signup" element={!token ? <SignUp /> : <Navigate replace to="/" />} />
      <Route path="*" element={token ? <Navigate replace to="/" /> : <Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
