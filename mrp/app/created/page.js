'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Alert from '../Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

export default function CreateProduct() {
  const { user, showAlert, alert, checkAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: 'customer', // По умолчанию устанавливаем 'customer'
    image: null,
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const newProduct = {
        id: Date.now(),
        name: product.title, // Используем name вместо title для совместимости
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        originalPrice: parseFloat(product.price), // Добавляем originalPrice
        category: product.category,
        image: product.image ? URL.createObjectURL(product.image) : '/default-product.jpg',
        createdAt: new Date().toISOString(),
        creator: user.username,
        brand: user.username // Используем username как бренд
      };

      const savedProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      const updatedProducts = [...savedProducts, newProduct];
      localStorage.setItem('userProducts', JSON.stringify(updatedProducts));

      showAlert('Product created successfully!', 'success');
      
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      showAlert(error.message || 'Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Create Product</h2>
              
              {alert && (
                <Alert 
                  message={alert.message} 
                  type={alert.type} 
                  onClose={() => showAlert(null)} 
                />
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>


                <Form.Group className="mb-4" controlId="image">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/profile')}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Creating...</span>
                      </>
                    ) : 'Create Product'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}