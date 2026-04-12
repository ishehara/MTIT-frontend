import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import staffService from '../services/staffService';

function StaffList() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await staffService.getAll();
      setStaff(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (staffId) => {
    try {
      await staffService.delete(staffId);
      await fetchStaff();
      setConfirmDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAvailability =
      !availabilityFilter || member.availability === availabilityFilter;
    return matchesSearch && matchesAvailability;
  });

  const availableStaff = staff.filter((m) => m.availability === 'available').length;
  const totalExperience = staff.reduce((sum, m) => sum + m.experience_years, 0);

  return (
    <div>
      <div className="page-title">
        <h1>Staff Management</h1>
        <Link to="/staff/add" className="btn btn-primary">
          <FiPlus /> Add Staff
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Total Staff</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {staff.length}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Available Now</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {availableStaff}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Total Experience</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>
              {totalExperience} years
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <FiSearch
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
              }}
            />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', width: '100%', padding: '10px 12px' }}
            />
          </div>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : filteredStaff.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-text">
              {searchTerm || availabilityFilter
                ? 'No staff members found matching your search'
                : 'No staff members yet'}
            </div>
            {!searchTerm && !availabilityFilter && (
              <Link to="/staff/add" className="btn btn-primary">
                Add Your First Staff Member
              </Link>
            )}
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Current Load</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((member) => (
                <tr key={member.id}>
                  <td>
                    <strong>{member.name}</strong>
                  </td>
                  <td>{member.specialty}</td>
                  <td>
                    <div>
                      <small>{member.phone}</small>
                      {member.email && (
                        <>
                          <br />
                          <small style={{ color: '#999' }}>{member.email}</small>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{member.experience_years} years</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          member.workload > 5 ? '#fff3cd' : '#d1ecf1',
                        color: member.workload > 5 ? '#856404' : '#0c5460',
                      }}
                    >
                      {member.workload} jobs
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor:
                          member.availability === 'available'
                            ? '#d4edda'
                            : '#f8d7da',
                        color:
                          member.availability === 'available'
                            ? '#155724'
                            : '#721c24',
                      }}
                    >
                      {member.availability === 'available'
                        ? 'Available'
                        : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <Link
                        to={`/staff/edit/${member.id}`}
                        className="btn btn-sm btn-info"
                      >
                        <FiEdit /> Edit
                      </Link>
                      {confirmDelete === member.id ? (
                        <>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(member.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => setConfirmDelete(member.id)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StaffList;
