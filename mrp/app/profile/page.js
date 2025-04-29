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
import { FaPlus, FaSignOutAlt, FaTrash, FaUser, FaEdit } from 'react-icons/fa';

export default function Profile() {
  const { user, logout, deleteAccount, alert, showAlert, checkAuth } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProducts, setUserProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const getProductsFromStorage = () => {
    try {
      const products = localStorage.getItem('userProducts');
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('Error parsing products from storage:', error);
      return [];
    }
  };

  const loadUserProducts = useCallback(() => {
    try {
      const savedProducts = getProductsFromStorage();
      const filteredProducts = savedProducts.filter(
        product => product.creator === user?.username
      );
      setUserProducts(filteredProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      showAlert('Failed to load user products');
    }
  }, [user?.username, showAlert]);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      try {
        const isAuthenticated = await checkAuth();
        if (!isAuthenticated) {
          router.push('/login');
        } else {
          loadUserProducts();
        }
      } catch (error) {
        showAlert(error.message || 'Authentication check failed');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [checkAuth, router, showAlert, loadUserProducts]);

  const handleDeleteProduct = (productId) => {
    try {
      const savedProducts = getProductsFromStorage();
      const productToDelete = savedProducts.find(p => p.id === productId);
      const updatedProducts = savedProducts.filter(
        product => product.id !== productId
      );
      
      localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
      
      if (productToDelete?.image) {
        const productImages = JSON.parse(localStorage.getItem('productImages') || '{}');
        delete productImages[`customer-${productId}`];
        localStorage.setItem('productImages', JSON.stringify(productImages));
      }
      
      loadUserProducts();
      showAlert('Product deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showAlert('Failed to delete product');
    }
  };
  
  const handleUpdateProduct = (updatedProduct) => {
    try {
      const savedProducts = getProductsFromStorage();
      const updatedProducts = savedProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      );
      
      localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
      
      if (updatedProduct.image && updatedProduct.image.startsWith('data:image')) {
        const productImages = JSON.parse(localStorage.getItem('productImages') || {});
        productImages[`customer-${updatedProduct.id}`] = updatedProduct.image;
        localStorage.setItem('productImages', JSON.stringify(productImages));
      }
      
      loadUserProducts();
      setShowEditModal(false);
      showAlert('Product updated successfully', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      showAlert('Failed to update product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteAccount = useCallback(async () => {
    setIsDeleting(true);
    try {
      const savedProducts = getProductsFromStorage();
      const updatedProducts = savedProducts.filter(
        product => product.creator !== user?.username
      );
      localStorage.setItem('userProducts', JSON.stringify(updatedProducts));
      
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
  }, [deleteAccount, showAlert, user?.username]);

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

            <Card className="shadow-sm mb-4">
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
                          Create Product
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

            <Card className="shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Your Products</h5>
              </Card.Header>
              <Card.Body>
                {userProducts.length > 0 ? (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {userProducts.map((product) => (
                      <Col key={product.id}>
                        <Card className="h-100">
                          <Card.Img 
                            variant="top" 
                            src={product.image || '/default-product.jpg'} 
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <Card.Body>
                            <Card.Title>{product.title || product.name}</Card.Title>
                            
                            <div className="mb-3">
                              <div className="d-flex justify-content-between mb-2">
                                <span className="text-danger fw-bold">${product.price || product.salePrice}</span>
                                {product.originalPrice && (
                                  <span className="text-decoration-line-through text-muted">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              {product.description && (
                                <p className="small text-muted mb-3">
                                  {product.description}
                                </p>
                              )}
                              <div className="d-flex justify-content-between">
                                <Button 
                                  variant="warning" 
                                  size="sm"
                                  onClick={() => handleEditProduct(product)}
                                >
                                  <FaEdit /> Edit
                                </Button>
                                <Button 
                                  variant="danger" 
                                  size="sm"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  <FaTrash /> Delete
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-4">
                    <p>You haven't created any products yet.</p>
                    <Button 
                      variant="primary" 
                      onClick={() => router.push('/created')}
                    >
                      Create Your First Product
                    </Button>
                  </div>
                )}
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
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
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

      {editingProduct && (
        <EditProductModal 
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          product={editingProduct}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
}

function EditProductModal({ show, onHide, product, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      onSave(editedProduct);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={editedProduct.title || editedProduct.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={editedProduct.description || ''}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={editedProduct.price || editedProduct.salePrice || ''}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}