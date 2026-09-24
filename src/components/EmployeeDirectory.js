import React from 'react';
import PropTypes from 'prop-types';
import EmployeeCard from './EmployeeCard';

function EmployeeDirectory({ employees, showDetails }) {
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
          />
        ))}
      </div>
    </div>
  );
}

EmployeeDirectory.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  showDetails: PropTypes.bool
};

export default EmployeeDirectory;
