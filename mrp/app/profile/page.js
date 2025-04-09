'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Alert from '../Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Profile() {
  const { user, logout, deleteAccount, alert, showAlert, checkAuth } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/login');
        }
      } catch (error) {
        showAlert(error.message || 'Authentication check failed');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth, router, showAlert]);

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

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className='container-profile' style={{ padding: '200px 0' }}>
      <div className="container">
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
        <Modal 
          show={showDeleteModal} 
          onHide={() => setShowDeleteModal(false)} 
          centered
          backdrop="static"
          keyboard={false} 
          className="text-black"
        >
          <Modal.Header closeButton className="border-bottom-0">
            <Modal.Title>Confirm Account Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <p className="text-danger">All your data will be permanently removed.</p>
          </Modal.Body>
          <Modal.Footer className="border-top-0">
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
    </div>
  );
}