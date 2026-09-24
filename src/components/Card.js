import React from 'react';
import PropTypes from 'prop-types';

// Головний компонент Card з використанням children prop
export function Card({ children, variant, size, shadow, border }) {
  const cardClasses = [
    'custom-card',
    `card-variant-${variant}`,
    `card-size-${size}`,
    shadow ? 'card-shadow' : '',
    border ? 'card-border' : ''
  ].filter(Boolean).join(' ');

  return <div className={cardClasses}>{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  shadow: PropTypes.bool,
  border: PropTypes.bool
};

Card.defaultProps = {
  variant: 'secondary',
  size: 'medium',
  shadow: true,
  border: true
};

// Дочірній компонент CardHeader
export function CardHeader({ children }) {
  return <div className="card-header-block">{children}</div>;
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired
};

// Дочірній компонент CardBody
export function CardBody({ children }) {
  return <div className="card-body-block">{children}</div>;
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired
};

// Дочірній компонент CardFooter
export function CardFooter({ children }) {
  return <div className="card-footer-block">{children}</div>;
}

CardFooter.propTypes = {
  children: PropTypes.node.isRequired
};
