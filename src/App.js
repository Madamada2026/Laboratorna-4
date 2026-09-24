import React, { useState } from 'react';
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

  const handleEmailClick = (email) => {
    incrementCounter();
    alert(`Надсилання листа на: ${email}`);
  };

  const handlePhoneClick = (phone) => {
    incrementCounter();
    alert(`Виклик на номер: ${phone}`);
  };

  const handleViewProfile = (id) => {
    incrementCounter();
    const emp = employees.find(e => e.id === id);
    alert(`Профіль співробітника: ${emp ? emp.name : id}`);
  };

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
        {/* Завдання 5: Система коментарів */}
        <CommentSystem />

        <hr className="section-divider" />

        {/* Завдання 4: Каталог товарів */}
        <section className="catalog-section">
          <div className="controls-panel">
            <input 
              type="text" 
              placeholder="🔍 Пошук товарів..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="control-input"
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="control-select">
              <option value="Всі">Всі категорії</option>
              <option value="Електроніка">Електроніка</option>
              <option value="Аудіо">Аудіо</option>
              <option value="Аксесуари">Аксесуари</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)} className="control-select">
              <option value="name-asc">Назва (А-Я)</option>
              <option value="name-desc">Назва (Я-А)</option>
              <option value="price-asc">Ціна (дешевші)</option>
              <option value="price-desc">Ціна (дорожчі)</option>
            </select>

            <div className="view-mode-buttons">
              <button 
                className={`mode-btn ${mode === 'grid' ? 'active' : ''}`} 
                onClick={() => setMode('grid')}
              >
                📱 Сітка
              </button>
              <button 
                className={`mode-btn ${mode === 'list' ? 'active' : ''}`} 
                onClick={() => setMode('list')}
              >
                📄 Список
              </button>
            </div>
          </div>

          <ProductCatalog 
            products={products}
            selectedCategory={category}
            searchQuery={search}
            sortBy={sort}
            viewMode={mode}
          />
        </section>

        <hr className="section-divider" />

        {/* Завдання 3 */}
        <Dashboard />

        <hr className="section-divider" />

        {/* Завдання 1 та 2 */}
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


