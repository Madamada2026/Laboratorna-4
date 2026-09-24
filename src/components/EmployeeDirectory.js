import React from 'react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

function EmployeeDirectory({ 
  employees, 
  showDetails, 
  onEmailClick, 
  onPhoneClick, 
  onViewProfile 
}) {
  if (!employees || employees.length === 0) {
    return <div className="empty-directory">Співробітників не знайдено.</div>;
  }

  return (
    <div className="employee-directory">
      <h2 className="directory-title">Довідник співробітників компанії</h2>
      <div className="employee-grid">
        {employees.map((emp) => (
          <EmployeeCard 
            key={emp.id} 
            employee={emp} 
            showDetails={showDetails} 
            onEmailClick={onEmailClick}
            onPhoneClick={onPhoneClick}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
}

EmployeeDirectory.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  showDetails: PropTypes.bool,
  onEmailClick: PropTypes.func.isRequired,
  onPhoneClick: PropTypes.func.isRequired,
  onViewProfile: PropTypes.func.isRequired
};

export default EmployeeDirectory;
