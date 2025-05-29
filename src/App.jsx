import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import TabsContainerMedals from './pages/TabsMedals/TabsContainer';
import TabsContainerStatues from './pages/TabsStatues/TabsContainer';
import TabsContainerCups from './pages/TabsCups/TabsContainer';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './pages/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="medals" element={<TabsContainerMedals section="medals" />} />
            <Route path="statues" element={<TabsContainerStatues section="statues" />} />
            <Route path="cups" element={<TabsContainerCups section="cups" />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
