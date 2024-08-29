import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableComponent from './Components/TableComponent';
import CodeViewComponent from './Components/CodeViewComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TableComponent />} />
        <Route path="/view-code/:id" element={<CodeViewComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
