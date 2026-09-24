import React, { useState } from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import Dashboard from './components/Dashboard';
import { initialEmployees } from './mockData';
import './App.css';

function App() {
  const [employees] = useState(initialEmployees);
  const [showDetails, setShowDetails] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);

  const incrementCounter = () => {
    setInteractionCount(prev => prev + 1);
  };

  const handleEmailClick = (email) => {
    incrementCounter();
    console.log(`[Callback] Email: ${email}`);
    alert(`Надсилання листа на: ${email}`);
  };

  const handlePhoneClick = (phone) => {
    incrementCounter();
    console.log(`[Callback] Телефон: ${phone}`);
    alert(`Виклик на номер: ${phone}`);
  };

  const handleViewProfile = (id) => {
    incrementCounter();
    const emp = employees.find(e => e.id === id);
    console.log(`[Callback] Перегляд профілю ID ${id}:`, emp);
    alert(`Профіль співробітника: ${emp ? emp.name : id}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <button 
          className="toggle-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Сховати контакти' : 'Показати контакти'}
        </button>

        <div className="interaction-counter">
          Взаємодій з кнопками: <span>{interactionCount}</span>
        </div>
      </header>

      <main className="app-main">
        {/* Завдання 3: Панель з картками на основі children та композиції */}
        <Dashboard />

        <hr className="section-divider" />

        {/* Завдання 1 та 2: Довідник співробітників */}
        <EmployeeDirectory 
          employees={employees} 
          showDetails={showDetails} 
          onEmailClick={handleEmailClick}
          onPhoneClick={handlePhoneClick}
          onViewProfile={handleViewProfile}
        />
      </main>
    </div>
  );
}

export default App;

