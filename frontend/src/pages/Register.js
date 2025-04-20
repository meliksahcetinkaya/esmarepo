import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import './Register.css';

// Validasyon şeması
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .required('İsim gerekli'),
  email: Yup.string()
    .email('Geçerli bir e-posta adresi girin')
    .required('E-posta adresi gerekli'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre gerekli'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor')
    .required('Şifre onayı gerekli'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Sadece rakam giriniz")
    .min(10, 'Telefon numarası en az 10 karakter olmalıdır')
    .max(15, 'Telefon numarası en fazla 15 karakter olabilir')
    .required('Telefon numarası gerekli'),
  terms: Yup.boolean()
    .oneOf([true], 'Devam etmek için şartları kabul etmelisiniz')
});

const Register = () => {
  const [error, setError] = useState(null);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      const { confirmPassword, terms, ...userData } = values;
      await register(userData);
      navigate('/login', { state: { message: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.' } });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7} xl={6}>
            <Card className="register-card">
              <Card.Body className="p-4 p-lg-5">
                <div className="text-center mb-4">
                  <h2 className="register-title">Hesap Oluştur</h2>
                  <p className="register-subtitle">MatFit ailesine katılın</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phone: '',
                    terms: false
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faUser} className="me-2" />
                              İsim Soyisim
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="İsim Soyisim"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                              E-posta Adresi
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="ornek@email.com"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faLock} className="me-2" />
                              Şifre
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Şifrenizi girin"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.password && errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faLock} className="me-2" />
                              Şifre Tekrarı
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              placeholder="Şifrenizi tekrar girin"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.confirmPassword && errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-4" controlId="phone">
                            <Form.Label className="d-flex align-items-center">
                              <FontAwesomeIcon icon={faPhone} className="me-2" />
                              Telefon Numarası
                            </Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              placeholder="5XX XXX XX XX"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.phone && errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-4" controlId="terms">
                            <Form.Check
                              type="checkbox"
                              name="terms"
                              checked={values.terms}
                              onChange={handleChange}
                              isInvalid={touched.terms && errors.terms}
                              feedback={errors.terms}
                              feedbackType="invalid"
                              label={
                                <span>
                                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="terms-link">
                                    Şartlar ve Koşullar
                                  </a>
                                  'ı okudum ve kabul ediyorum
                                </span>
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-4"
                        disabled={isSubmitting}
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        {isSubmitting ? 'Kaydediliyor...' : 'Hesap Oluştur'}
                      </Button>

                      <div className="text-center">
                        <p className="mb-0">
                          Zaten bir hesabınız var mı?{' '}
                          <Link to="/login" className="login-link">
                            Giriş Yap
                          </Link>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register; 