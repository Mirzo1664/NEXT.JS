'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Alert from '../Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Profile() {
  const { user, logout, deleteAccount, alert, showAlert } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Редирект если пользователь не авторизован
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Обработчик удаления аккаунта
  const handleDeleteAccount = useCallback(async () => {
    setIsDeleting(true);
    try {
      const success = await deleteAccount();
      if (success) {
        showAlert('Your account has been deleted', 'success');
        setShowDeleteModal(false);
      }
    } catch (error) {
      showAlert(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  }, [deleteAccount, showAlert]);

  if (!user) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Profile</h2>
              
              {alert && (
                <Alert 
                  message={alert.message} 
                  type={alert.type} 
                  onClose={() => showAlert(null)} 
                />
              )}
              
              <div className="mb-4">
                <h5 className="mb-3">Account Information</h5>
                <div className="mb-2">
                  <strong>Name:</strong> {user.name}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
              </div>
              
              <div className="d-flex justify-content-between mt-4">
                <Button 
                  variant="outline-secondary" 
                  onClick={logout}
                >
                  Logout
                </Button>
                
                <Button 
                  variant="danger" 
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)} 
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p className="text-danger">All your data will be permanently removed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Deleting...</span>
              </>
            ) : 'Delete Account'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}