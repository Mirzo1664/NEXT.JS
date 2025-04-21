'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Alert from '../Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaPlus, FaSignOutAlt, FaTrash, FaUser } from 'react-icons/fa';

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
    <div className="profile-page py-5 mb-5 mt-5">
      <div className="container">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {alert && (
              <Alert 
                message={alert.message} 
                type={alert.type} 
                onClose={() => showAlert(null)} 
              />
            )}

            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <div className="d-flex align-items-center">
                  <FaUser className="me-2" />
                  <h4 className="mb-0">User Profile</h4>
                </div>
              </Card.Header>
              
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <div className="mb-4">
                      <h5 className="border-bottom pb-2">All Information</h5>
                      <div className="mb-3">
                        <label className="text-muted small mb-1">Name</label>
                        <p className="fs-5">{user.name}</p>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small mb-1">Email</label>
                        <p className="fs-5">{user.email}</p>
                      </div>
                    </div>
                  </Col>
                  
                  <Col md={6}>
                    <div className="mb-4">
                      <h5 className="border-bottom pb-2">Actions</h5>
                      <div className="d-grid gap-3">
                        <Button
                          variant="outline-secondary"
                          onClick={logout}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FaSignOutAlt className="me-2" />     
                          Log out of your account
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => router.push('/created')}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FaPlus className="me-2" />
                          Создать товар
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => setShowDeleteModal(true)}
                          className="d-flex align-items-center justify-content-center"
                        >
                          <FaTrash className="me-2" />
                          Delete account
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)} 
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className='text-dark'>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='text-dark'>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p className="text-danger">All your data will be permanently deleted.</p>
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
            ) : 'Delete account'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
