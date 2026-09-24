import React, { useState } from 'react';
import KanbanBoard from './components/KanbanBoard'; // <-- Додано імпорт
import EmployeeDirectory from './components/EmployeeDirectory';
import Dashboard from './components/Dashboard';
import ProductCatalog from './components/ProductCatalog';
import CommentSystem from './components/CommentSystem';
import { initialEmployees, initialProducts } from './mockData';
import './App.css';

function App() {
  const [employees] = useState(initialEmployees);
  const [products] = useState(initialProducts);
  const [showDetails, setShowDetails] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);

  const [category, setCategory] = useState('Всі');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [mode, setMode] = useState('grid');

  const incrementCounter = () => setInteractionCount(prev => prev + 1);

  return (
    <div className="app-container">
      <header className="app-header">
        <button className="toggle-btn" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Сховати контакти' : 'Показати контакти'}
        </button>
        <div className="interaction-counter">
          Взаємодій з кнопками: <span>{interactionCount}</span>
        </div>
      </header>

      <main className="app-main">
        {/* Індивідуальне завдання 6: Kanban Board */}
        <KanbanBoard />

        <hr className="section-divider" />

        {/* Завдання 5 */}
        <CommentSystem />

        <hr className="section-divider" />

        {/* Завдання 4 */}
        <ProductCatalog 
          products={products}
          selectedCategory={category}
          searchQuery={search}
          sortBy={sort}
          viewMode={mode}
        />

        <hr className="section-divider" />

        {/* Завдання 3 */}
        <Dashboard />

        <hr className="section-divider" />

        {/* Завдання 1 та 2 */}
        <EmployeeDirectory 
          employees={employees} 
          showDetails={showDetails} 
          onEmailClick={() => incrementCounter()}
          onPhoneClick={() => incrementCounter()}
          onViewProfile={() => incrementCounter()}
        />
      </main>
    </div>
  );
}

export default App;



