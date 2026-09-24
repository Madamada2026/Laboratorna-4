import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Компонент картки завдання
function TaskCard({ task, onMoveTask }) {
  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-meta">
        <span>👤 {task.assignee}</span>
        <span>📅 {task.deadline}</span>
      </div>
      
      <div className="task-actions">
        {task.status !== 'To Do' && (
          <button className="move-btn" onClick={() => onMoveTask(task.id, 'left')}>
            ◄ Назад
          </button>
        )}
        {task.status !== 'Done' && (
          <button className="move-btn" onClick={() => onMoveTask(task.id, 'right')}>
            Вперед ►
          </button>
        )}
      </div>
    </div>
  );
}

// Компонент колонки
function Column({ title, tasks, onMoveTask }) {
  return (
    <div className="kanban-column">
      <h3 className="column-title">{title} <span className="task-count">({tasks.length})</span></h3>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">Немає завдань</p>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onMoveTask={onMoveTask} />
          ))
        )}
      </div>
    </div>
  );
}

// Головний компонент KanbanBoard
export function KanbanBoard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Лабораторна робота №4', description: 'Реалізувати каталог товарів', assignee: 'Олексій', priority: 'High', deadline: '2026-09-25', status: 'Done' },
    { id: 2, title: 'Верстка Kanban-дошки', description: 'Створити колонки та картки', assignee: 'Марія', priority: 'High', deadline: '2026-09-26', status: 'In Progress' },
    { id: 3, title: 'Оформлення звіту', description: 'Зібрати скріншоти та висновки', assignee: 'Олексій', priority: 'Medium', deadline: '2026-09-28', status: 'To Do' },
    { id: 4, title: 'Тестування коду', description: 'Перевірити рекурсію в коментарях', assignee: 'Іван', priority: 'Low', deadline: '2026-09-29', status: 'To Do' }
  ]);

  const [filterPriority, setFilterPriority] = useState('All');
  const [filterAssignee, setFilterAssignee] = useState('All');

  // Callback для переміщення завдань між колонками
  const handleMoveTask = (taskId, direction) => {
    const statuses = ['To Do', 'In Progress', 'Done'];
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const currentIndex = statuses.indexOf(task.status);
          const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
          if (newIndex >= 0 && newIndex < statuses.length) {
            return { ...task, status: statuses[newIndex] };
          }
        }
        return task;
      })
    );
  };

  // Фільтрація завдань
  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'All' || task.assignee === filterAssignee;
    return matchesPriority && matchesAssignee;
  });

  return (
    <div className="kanban-container">
      <h2 className="kanban-main-title">Система управління завданнями (Kanban Board)</h2>

      {/* Панель фільтрації */}
      <div className="kanban-filters">
        <div className="filter-group">
          <label>Пріоритет: </label>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="control-select">
            <option value="All">Всі пріоритети</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Виконавець: </label>
          <select value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)} className="control-select">
            <option value="All">Всі виконавці</option>
            <option value="Олексій">Олексій</option>
            <option value="Марія">Марія</option>
            <option value="Іван">Іван</option>
          </select>
        </div>
      </div>

      {/* Дошка з колонками */}
      <div className="kanban-board">
        <Column 
          title="To Do" 
          tasks={filteredTasks.filter(t => t.status === 'To Do')} 
          onMoveTask={handleMoveTask} 
        />
        <Column 
          title="In Progress" 
          tasks={filteredTasks.filter(t => t.status === 'In Progress')} 
          onMoveTask={handleMoveTask} 
        />
        <Column 
          title="Done" 
          tasks={filteredTasks.filter(t => t.status === 'Done')} 
          onMoveTask={handleMoveTask} 
        />
      </div>
    </div>
  );
}

export default KanbanBoard;
