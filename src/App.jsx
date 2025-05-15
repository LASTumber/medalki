import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import TabsContainerMedals from './pages/TabsMedals/TabsContainer';
import TabsContainerStatues from './pages/TabsStatues/TabsContainer';
import TabsContainerCups from './pages/TabsCups/TabsContainer';
import AdminPage from './pages/AdminPage';
import ScrollToTop from './components/ScrollToTop';

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
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
