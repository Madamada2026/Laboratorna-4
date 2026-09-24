import React, { useState } from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import { initialEmployees } from './mockData';
import './App.css';

function App() {
  const [employees] = useState(initialEmployees);
  const [showDetails, setShowDetails] = useState(true);
  
  // Стан для лічильника взаємодій (Завдання 2)
  const [interactionCount, setInteractionCount] = useState(0);

  // Впомогальна функція для збільшення лічильника
  const incrementCounter = () => {
    setInteractionCount(prev => prev + 1);
  };

  // Обробник натискання на Email
  const handleEmailClick = (email) => {
    incrementCounter();
    console.log(`[Callback] Відправка email на адресу: ${email}`);
    alert(`Надсилання листа на: ${email}`);
  };

  // Обробник натискання на Дзвінок
  const handlePhoneClick = (phone) => {
    incrementCounter();
    console.log(`[Callback] Виклик за номером: ${phone}`);
    alert(`Здійснення виклику на номер: ${phone}`);
  };

  // Обробник натискання на Профіль
  const handleViewProfile = (id) => {
    incrementCounter();
    const emp = employees.find(e => e.id === id);
    console.log(`[Callback] Перегляд профілю ID ${id}:`, emp);
    alert(`Перегляд профілю співробітника: ${emp ? emp.name : id}`);
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

        {/* Відображення лічильника взаємодій */}
        <div className="interaction-counter">
          Взаємодій з кнопками: <span>{interactionCount}</span>
        </div>
      </header>

      <main className="app-main">
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
