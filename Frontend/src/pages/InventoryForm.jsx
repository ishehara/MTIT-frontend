import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import inventoryService from '../services/inventoryService';

function InventoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    supplier: '',
    condition: '',
    warranty_period: '',
  });

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const item = await inventoryService.getById(id);
      setFormData({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        supplier: item.supplier,
        condition: item.condition,
        warranty_period: item.warranty_period,
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
        await inventoryService.update(id, formData);
        setSuccess('Inventory item updated successfully!');
      } else {
        await inventoryService.create(formData);
        setSuccess('Inventory item created successfully!');
      }
      setTimeout(() => navigate('/inventory'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/inventory')}
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="page-title">
        <h1>{id ? 'Edit Inventory Item' : 'Add Inventory Item'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Item Name *</label>
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
            <div className="form-group">
              <label>Supplier *</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                minLength="2"
                maxLength="120"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="500"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Unit Price (Rs) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Condition *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">Refurbished</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Warranty Period *</label>
            <input
              type="text"
              name="warranty_period"
              value={formData.warranty_period}
              onChange={handleChange}
              required
              placeholder="e.g., 12 months, 24 months"
              minLength="1"
              maxLength="50"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/inventory')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Item' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;
