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
    category: 'women', // Установим значение по умолчанию
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
      // Создаем объект нового продукта
      const newProduct = {
        id: Date.now(), // Генерируем уникальный ID
        name: product.title,
        description: product.description,
        salePrice: parseFloat(product.price),
        originalPrice: parseFloat(product.price) * 1.2, // Добавляем "оригинальную" цену
        brand: user?.username || 'My Brand', // Используем имя пользователя как бренд
        category: product.category,
        image: product.image ? URL.createObjectURL(product.image) : '/default-product.jpg',
        createdAt: new Date().toISOString()
      };

      // Получаем текущие продукты из localStorage
      const currentProducts = JSON.parse(localStorage.getItem('customProducts') || '{}');
      
      // Добавляем новый продукт в соответствующую категорию
      if (!currentProducts[product.category]) {
        currentProducts[product.category] = [];
      }
      currentProducts[product.category].push(newProduct);
      
      // Сохраняем обновленный список
      localStorage.setItem('customProducts', JSON.stringify(currentProducts));

      showAlert('Товар успешно создан!', 'success');
      
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      showAlert(error.message || 'Ошибка при создании товара');
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
              <h2 className="card-title text-center mb-4">Создать карточку товара</h2>
              
              {alert && (
                <Alert 
                  message={alert.message} 
                  type={alert.type} 
                  onClose={() => showAlert(null)} 
                />
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Название товара</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Описание</Form.Label>
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
                  <Form.Label>Цена</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Категория</Form.Label>
                  <Form.Select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="women">Женская одежда</option>
                    <option value="men">Мужская одежда</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="image">
                  <Form.Label>Изображение товара</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => router.push('/profile')}
                    disabled={isSubmitting}
                  >
                    Назад
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
                        <span className="ms-2">Сохранение...</span>
                      </>
                    ) : 'Создать товар'}
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