import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './Layout';
import TabsContainer from './pages/Tabs/TabsContainer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/medals" element={<TabsContainer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;