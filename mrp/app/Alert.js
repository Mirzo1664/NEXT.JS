'use client';

export default function Alert({ alert, onClose }) {
  if (!alert) return null;

  const alertClasses = {
    success: 'alert-success',
    danger: 'alert-danger',
    info: 'alert-info',
    warning: 'alert-warning'
  };

  return (
    <div 
      className={`alert ${alertClasses[alert.type] || 'alert-danger'} alert-dismissible fade show`} 
      role="alert"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      {alert.message}
      <button 
        type="button" 
        className="btn-close" 
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
}