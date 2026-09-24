import React from 'react';
import PropTypes from 'prop-types';

function EmployeeCard({ 
  employee, 
  showDetails, 
  onEmailClick, 
  onPhoneClick, 
  onViewProfile 
}) {
  const { id, name, position, department, email, phone, avatar, isOnline, isManager } = employee;

  return (
    <div className={`employee-card ${isManager ? 'manager-border' : ''}`}>
      <div className="avatar-wrapper">
        <img src={avatar} alt={name} className="employee-avatar" />
        <span 
          className={`status-badge ${isOnline ? 'online' : 'offline'}`}
          title={isOnline ? 'Online' : 'Offline'}
        />
      </div>

      <div className="employee-info">
        <div className="employee-header">
          <h3 className="employee-name">{name}</h3>
          {isManager && <span className="manager-badge">Керівник</span>}
        </div>

        <p className="employee-position">{position}</p>
        <p className="employee-department">Відділ: <strong>{department}</strong></p>

        {showDetails && (
          <div className="employee-contacts">
            <hr />
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Тел:</strong> {phone}</p>
          </div>
        )}

        {/* Блок з кнопками дій для Завдання 2 */}
        <div className="card-actions">
          <button 
            className="action-btn email-btn" 
            onClick={() => onEmailClick(email)}
          >
            ✉️ Email
          </button>
          <button 
            className="action-btn phone-btn" 
            onClick={() => onPhoneClick(phone)}
          >
            📞 Дзвінок
          </button>
          <button 
            className="action-btn profile-btn" 
            onClick={() => onViewProfile(id)}
          >
            👤 Профіль
          </button>
        </div>
      </div>
    </div>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,
    isManager: PropTypes.bool.isRequired
  }).isRequired,
  showDetails: PropTypes.bool,
  onEmailClick: PropTypes.func.isRequired,
  onPhoneClick: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired
};

EmployeeCard.defaultProps = {
  showDetails: true
};

export default EmployeeCard;
