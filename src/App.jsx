import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import CartPage from './pages/CartPage/CartPage';

import { AuthContext } from './pages/context/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="medals" element={<TabsContainerMedals section="medals" />} />
            <Route path="statues" element={<TabsContainerStatues section="statues" />} />
            <Route path="cups" element={<TabsContainerCups section="cups" />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Защищённые маршруты */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
