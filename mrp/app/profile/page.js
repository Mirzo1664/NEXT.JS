'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Alert from '../Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Profile() {
  const { user, logout, deleteAccount, alert, showAlert } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const handleDeleteAccount = () => {
    const success = deleteAccount();
    if (success) {
      showAlert('Your account has been deleted', 'success');
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Profile</h2>
              
              {alert && <Alert alert={alert} onClose={() => showAlert(null)} />}
              
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
                <button 
                  onClick={logout}
                  className="btn btn-outline-secondary"
                >
                  Logout
                </button>
                
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-danger"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения удаления */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p className="text-danger">All your data will be permanently removed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}