import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import repairService from '../services/repairService';
import { formatDistanceToNow } from 'date-fns';

function RepairList() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const repairStatuses = [
    { value: 'not_started', label: 'Not Started', color: '#6c757d' },
    { value: 'repairing', label: 'Repairing', color: '#ffc107' },
    { value: 'finished', label: 'Finished', color: '#28a745' },
    { value: 'handed_over', label: 'Handed Over', color: '#17a2b8' },
  ];

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const data = await repairService.getAll();
      setRepairs(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await repairService.delete(jobId);
      await fetchRepairs();
      setConfirmDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredRepairs = repairs.filter((repair) => {
    const matchesSearch =
      repair.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.device_brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || repair.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const statusObj = repairStatuses.find((s) => s.value === status);
    return statusObj?.color || '#999';
  };

  const getStatusLabel = (status) => {
    const statusObj = repairStatuses.find((s) => s.value === status);
    return statusObj?.label || status;
  };

  const activeJobs = repairs.filter(
    (r) => r.status !== 'handed_over' && r.status !== 'finished'
  ).length;
  const completedJobs = repairs.filter((r) => r.status === 'handed_over').length;

  return (
    <div>
      <div className="page-title">
        <h1>Repair Management</h1>
        <Link to="/repairs/add" className="btn btn-primary">
          <FiPlus /> Register Repair
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Total Repairs</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {repairs.length}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Active Jobs</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {activeJobs}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Completed</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              {completedJobs}
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
              placeholder="Search repairs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', width: '100%', padding: '10px 12px' }}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">All Status</option>
            {repairStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : filteredRepairs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔧</div>
            <div className="empty-state-text">
              {searchTerm || statusFilter
                ? 'No repairs found matching your search'
                : 'No repair jobs yet'}
            </div>
            {!searchTerm && !statusFilter && (
              <Link to="/repairs/add" className="btn btn-primary">
                Register Your First Repair
              </Link>
            )}
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Device</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepairs.map((repair) => (
                <tr key={repair.id}>
                  <td>
                    <div>
                      <strong>{repair.customer_name}</strong>
                      <br />
                      <small style={{ color: '#999' }}>{repair.customer_phone}</small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>
                        {repair.device_brand} {repair.device_model}
                      </strong>
                      <br />
                      <small style={{ color: '#999' }}>{repair.device_type}</small>
                    </div>
                  </td>
                  <td>
                    <small>{repair.issue_description.substring(0, 50)}...</small>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(repair.status) + '20',
                        color: getStatusColor(repair.status),
                        border: `1px solid ${getStatusColor(repair.status)}`,
                      }}
                    >
                      {getStatusLabel(repair.status)}
                    </span>
                  </td>
                  <td>
                    <small>{formatDistanceToNow(new Date(repair.created_at), { addSuffix: true })}</small>
                  </td>
                  <td>
                    <div className="actions">
                      <Link
                        to={`/repairs/edit/${repair.id}`}
                        className="btn btn-sm btn-info"
                      >
                        <FiEdit /> Edit
                      </Link>
                      {confirmDelete === repair.id ? (
                        <>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(repair.id)}
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
                          onClick={() => setConfirmDelete(repair.id)}
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

export default RepairList;
