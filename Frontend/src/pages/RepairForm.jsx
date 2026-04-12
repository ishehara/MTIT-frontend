import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import repairService from '../services/repairService';

function RepairForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    device_type: '',
    device_brand: '',
    device_model: '',
    issue_description: '',
  });
  const [statusData, setStatusData] = useState({
    status: '',
    technician_notes: '',
  });

  const repairStatuses = [
    { value: 'not_started', label: 'Not Started' },
    { value: 'repairing', label: 'Repairing' },
    { value: 'finished', label: 'Finished' },
    { value: 'handed_over', label: 'Handed Over' },
  ];

  const deviceTypes = [
    'Laptop',
    'Desktop Computer',
    'Smartphone',
    'Tablet',
    'Monitor',
    'Printer',
    'Other',
  ];

  useEffect(() => {
    if (id) {
      fetchRepair();
    }
  }, [id]);

  const fetchRepair = async () => {
    try {
      setLoading(true);
      const repair = await repairService.getById(id);
      setFormData({
        customer_name: repair.customer_name,
        customer_phone: repair.customer_phone,
        customer_email: repair.customer_email || '',
        device_type: repair.device_type,
        device_brand: repair.device_brand,
        device_model: repair.device_model,
        issue_description: repair.issue_description,
      });
      setStatusData({
        status: repair.status,
        technician_notes: repair.technician_notes || '',
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

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prev) => ({
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
        // For editing, send all data
        await repairService.update(id, formData);
        setSuccess('Repair job updated successfully!');
      } else {
        await repairService.create(formData);
        setSuccess('Repair job registered successfully!');
      }
      setTimeout(() => navigate('/repairs'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      await repairService.updateStatus(id, statusData);
      setSuccess('Repair status updated successfully!');
      setTimeout(() => fetchRepair(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/repairs')}
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="page-title">
        <h1>{id ? 'Edit Repair Job' : 'Register New Repair'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        {id && (
          <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('details')}
                className="btn"
                style={{
                  backgroundColor: activeTab === 'details' ? '#667eea' : '#ddd',
                  color: activeTab === 'details' ? 'white' : '#333',
                }}
              >
                Job Details
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className="btn"
                style={{
                  backgroundColor: activeTab === 'status' ? '#667eea' : '#ddd',
                  color: activeTab === 'status' ? 'white' : '#333',
                }}
              >
                Status & Notes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <form onSubmit={handleSubmit} className="form">
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  minLength="2"
                  maxLength="120"
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  required
                  minLength="7"
                  maxLength="20"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
              />
            </div>

            <h3 style={{ marginTop: '30px' }}>Device Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Device Type *</label>
                <select
                  name="device_type"
                  value={formData.device_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Device Type</option>
                  {deviceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Brand *</label>
                <input
                  type="text"
                  name="device_brand"
                  value={formData.device_brand}
                  onChange={handleChange}
                  required
                  minLength="1"
                  maxLength="60"
                />
              </div>
              <div className="form-group">
                <label>Model *</label>
                <input
                  type="text"
                  name="device_model"
                  value={formData.device_model}
                  onChange={handleChange}
                  required
                  minLength="1"
                  maxLength="60"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Issue Description *</label>
              <textarea
                name="issue_description"
                value={formData.issue_description}
                onChange={handleChange}
                required
                minLength="5"
                maxLength="1000"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/repairs')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : id ? 'Update Job' : 'Register Repair'}
              </button>
            </div>
          </form>
        )}

        {activeTab === 'status' && id && (
          <form onSubmit={handleStatusSubmit} className="form">
            <div className="form-group">
              <label>Repair Status *</label>
              <select
                name="status"
                value={statusData.status}
                onChange={handleStatusChange}
                required
              >
                {repairStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Technician Notes</label>
              <textarea
                name="technician_notes"
                value={statusData.technician_notes}
                onChange={handleStatusChange}
                placeholder="Add any notes about the repair progress..."
                maxLength="1000"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveTab('details')}
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default RepairForm;
