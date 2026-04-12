import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import staffService from '../services/staffService';

function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience_years: '',
    availability: 'available',
  });

  const specialties = [
    'General Repair',
    'Laptop Repair',
    'Mobile Phone Repair',
    'Desktop Computer Repair',
    'Printer Repair',
    'Hardware Specialist',
    'Software Specialist',
    'Network Technician',
  ];

  useEffect(() => {
    if (id) {
      fetchStaff();
    }
  }, [id]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const staff = await staffService.getById(id);
      setFormData({
        name: staff.name,
        email: staff.email || '',
        phone: staff.phone,
        specialty: staff.specialty,
        experience_years: staff.experience_years,
        availability: staff.availability,
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
        await staffService.update(id, formData);
        setSuccess('Staff member updated successfully!');
      } else {
        await staffService.create(formData);
        setSuccess('Staff member created successfully!');
      }
      setTimeout(() => navigate('/staff'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/staff')}
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        <FiArrowLeft /> Back
      </button>

      <div className="page-title">
        <h1>{id ? 'Edit Staff Member' : 'Add New Staff Member'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength="2"
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength="7"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Specialty *</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialty</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Availability *</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/staff')}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : id ? 'Update Member' : 'Create Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StaffForm;
