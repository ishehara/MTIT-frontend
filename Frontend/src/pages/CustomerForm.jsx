import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import customerService from '../services/customerService';

function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    customer_id: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    customer_nic: '',
  });

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      const customer = await customerService.getById(id);
      setFormData({
        customer_id: customer.customer_id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        address: customer.address,
        customer_nic: customer.customer_nic,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      if (id) {
        await customerService.update(id, formData);
        setSuccess('Customer updated successfully!');
      } else {
        await customerService.create(formData);
        setSuccess('Customer created successfully!');
      }
      setTimeout(() => navigate('/customers'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/customers')}
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="page-title">
        <h1>{id ? 'Edit Customer' : 'Add New Customer'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Customer ID *</label>
              <input
                type="number"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
                disabled={!!id}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="120"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength="7"
                maxLength="20"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>NIC *</label>
              <input
                type="text"
                name="customer_nic"
                value={formData.customer_nic}
                onChange={handleChange}
                required
                minLength="5"
                maxLength="20"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              minLength="5"
              maxLength="300"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/customers')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Customer' : 'Create Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
