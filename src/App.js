import React, { useState } from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import { initialEmployees } from './mockData';
import './App.css';

function App() {
  const [employees] = useState(initialEmployees);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="app-container">
      <header className="app-header">
        
        <button 
          className="toggle-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Сховати контакти' : 'Показати контакти'}
        </button>
      </header>

      <main className="app-main">
        <EmployeeDirectory 
          employees={employees} 
          showDetails={showDetails} 
        />
      </main>
    </div>
  );
}

export default App;
