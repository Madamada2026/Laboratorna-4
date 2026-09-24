import React from 'react';
import PropTypes from 'prop-types';

function EmployeeCard({ employee, showDetails }) {
  const { name, position, department, email, phone, avatar, isOnline, isManager } = employee;

  return (
    <div className={`employee-card ${isManager ? 'manager-border' : ''}`}>
      <div className="avatar-wrapper">
        <img src={avatar} alt={name} className="employee-avatar" />
        {/* Умовний рендеринг індикатора онлайн-статусу */}
        <span 
          className={`status-badge ${isOnline ? 'online' : 'offline'}`}
          title={isOnline ? 'Online' : 'Offline'}
        />
      </div>

      <div className="employee-info">
        <div className="employee-header">
          <h3 className="employee-name">{name}</h3>
          {/* Умовний рендеринг відмітки керівника */}
          {isManager && <span className="manager-badge">Керівник</span>}
        </div>

        <p className="employee-position">{position}</p>
        <p className="employee-department">Відділ: <strong>{department}</strong></p>

        {/* Умовний рендеринг додаткових деталей */}
        {showDetails && (
          <div className="employee-contacts">
            <hr />
            <p><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
            <p><strong>Тел:</strong> <a href={`tel:${phone}`}>{phone}</a></p>
          </div>
        )}
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
  showDetails: PropTypes.bool
};

EmployeeCard.defaultProps = {
  showDetails: true
};

export default EmployeeCard;
