import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiBox, FiTool, FiTrendingUp } from 'react-icons/fi';
import customerService from '../services/customerService';
import inventoryService from '../services/inventoryService';
import repairService from '../services/repairService';
import staffService from '../services/staffService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalInventory: 0,
    totalRepairs: 0,
    totalStaff: 0,
    activeJobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customers, inventory, repairs, staff] = await Promise.all([
          customerService.getAll(),
          inventoryService.getAll(),
          repairService.getAll(),
          staffService.getAll(),
        ]);

        const activeJobs = repairs.filter(r => r.status !== 'handed_over' && r.status !== 'finished').length;

        setStats({
          totalCustomers: customers.length,
          totalInventory: inventory.length,
          totalRepairs: repairs.length,
          totalStaff: staff.length,
          activeJobs: activeJobs,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color, link }) => (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', transition: 'transform 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              fontSize: '48px',
              color: color,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon />
          </div>
          <div>
            <div style={{ color: '#999', fontSize: '14px' }}>{title}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : value}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div>
      <div className="page-title">
        <div>
          <h1>Dashboard</h1>
          <p className="page-subtitle">Welcome to Computer Repair Shop Management System</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard
          icon={FiUsers}
          title="Total Customers"
          value={stats.totalCustomers}
          color="#667eea"
          link="/customers"
        />
        <StatCard
          icon={FiBox}
          title="Inventory Items"
          value={stats.totalInventory}
          color="#28a745"
          link="/inventory"
        />
        <StatCard
          icon={FiTool}
          title="Total Repairs"
          value={stats.totalRepairs}
          color="#ffc107"
          link="/repairs"
        />
        <StatCard
          icon={FiUsers}
          title="Staff Members"
          value={stats.totalStaff}
          color="#17a2b8"
          link="/staff"
        />
      </div>

      <div className="card">
        <div className="card-header">
          <FiTrendingUp style={{ marginRight: '10px' }} />
          Active Repairs
        </div>
        <div className="card-body">
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
            {loading ? '...' : stats.activeJobs} jobs in progress
          </p>
          <Link to="/repairs" className="btn btn-primary" style={{ marginTop: '15px' }}>
            View All Repairs
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">Quick Actions</div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <Link to="/customers/add" className="btn btn-primary">
              Add New Customer
            </Link>
            <Link to="/inventory/add" className="btn btn-success">
              Add Inventory Item
            </Link>
            <Link to="/repairs/add" className="btn btn-warning">
              Register Repair
            </Link>
            <Link to="/staff/add" className="btn btn-info">
              Add Staff Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
