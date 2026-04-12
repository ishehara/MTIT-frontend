import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import inventoryService from '../services/inventoryService';

function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAll();
      setItems(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await inventoryService.delete(itemId);
      await fetchItems();
      setConfirmDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div className="page-title">
        <h1>Inventory Management</h1>
        <Link to="/inventory/add" className="btn btn-primary">
          <FiPlus /> Add Item
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Total Items</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {filteredItems.length}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Total Inventory Value</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
              Rs {totalValue.toFixed(2)}
            </div>
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>Low Stock Items</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
              {filteredItems.filter(item => item.quantity < 5).length}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
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
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', width: '100%', padding: '10px 12px' }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="loading-spinner"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-text">
              {searchTerm ? 'No items found matching your search' : 'No inventory items yet'}
            </div>
            {!searchTerm && <Link to="/inventory/add" className="btn btn-primary">
              Add Your First Item
            </Link>}
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Value</th>
                <th>Condition</th>
                <th>Warranty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} style={{ backgroundColor: item.quantity < 5 ? '#fff3cd' : 'inherit' }}>
                  <td>{item.name}</td>
                  <td>{item.supplier}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.quantity < 5 ? 'status-pending' : 'status-available'
                      }`}
                    >
                      {item.quantity}
                    </span>
                  </td>
                  <td>Rs {parseFloat(item.price).toFixed(2)}</td>
                  <td>Rs {(item.price * item.quantity).toFixed(2)}</td>
                  <td>{item.condition}</td>
                  <td>{item.warranty_period}</td>
                  <td>
                    <div className="actions">
                      <Link
                        to={`/inventory/edit/${item.id}`}
                        className="btn btn-sm btn-info"
                      >
                        <FiEdit /> Edit
                      </Link>
                      {confirmDelete === item.id ? (
                        <>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
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
                          onClick={() => setConfirmDelete(item.id)}
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

export default InventoryList;
