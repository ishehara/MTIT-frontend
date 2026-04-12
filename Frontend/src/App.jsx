import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles/index.css';

// Pages
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import CustomerForm from './pages/CustomerForm';
import InventoryList from './pages/InventoryList';
import InventoryForm from './pages/InventoryForm';
import RepairList from './pages/RepairList';
import RepairForm from './pages/RepairForm';
import StaffList from './pages/StaffList';
import StaffForm from './pages/StaffForm';

// Icons
import { FiHome, FiUsers, FiBox, FiTool, FiLogOut } from 'react-icons/fi';

function App() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const handleNavClick = (item) => {
    setActiveNavItem(item);
  };

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-brand">
              <FiTool size={28} />
              <span>Repair Shop Management</span>
            </div>
            <ul className="navbar-links">
              <li>
                <Link to="/" onClick={() => handleNavClick('dashboard')}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/customers" onClick={() => handleNavClick('customers')}>
                  Customers
                </Link>
              </li>
              <li>
                <Link to="/inventory" onClick={() => handleNavClick('inventory')}>
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/repairs" onClick={() => handleNavClick('repairs')}>
                  Repairs
                </Link>
              </li>
              <li>
                <Link to="/staff" onClick={() => handleNavClick('staff')}>
                  Staff
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul className="sidebar-menu">
              <li>
                <Link
                  to="/"
                  className={activeNavItem === 'dashboard' ? 'active' : ''}
                  onClick={() => handleNavClick('dashboard')}
                >
                  <FiHome size={18} /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/customers"
                  className={activeNavItem === 'customers' ? 'active' : ''}
                  onClick={() => handleNavClick('customers')}
                >
                  <FiUsers size={18} /> Customers
                </Link>
              </li>
              <li>
                <Link
                  to="/inventory"
                  className={activeNavItem === 'inventory' ? 'active' : ''}
                  onClick={() => handleNavClick('inventory')}
                >
                  <FiBox size={18} /> Inventory
                </Link>
              </li>
              <li>
                <Link
                  to="/repairs"
                  className={activeNavItem === 'repairs' ? 'active' : ''}
                  onClick={() => handleNavClick('repairs')}
                >
                  <FiTool size={18} /> Repairs
                </Link>
              </li>
              <li>
                <Link
                  to="/staff"
                  className={activeNavItem === 'staff' ? 'active' : ''}
                  onClick={() => handleNavClick('staff')}
                >
                  <FiUsers size={18} /> Staff
                </Link>
              </li>
            </ul>
          </aside>

          {/* Content Area */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* Customer Routes */}
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/add" element={<CustomerForm />} />
              <Route path="/customers/edit/:id" element={<CustomerForm />} />

              {/* Inventory Routes */}
              <Route path="/inventory" element={<InventoryList />} />
              <Route path="/inventory/add" element={<InventoryForm />} />
              <Route path="/inventory/edit/:id" element={<InventoryForm />} />

              {/* Repair Routes */}
              <Route path="/repairs" element={<RepairList />} />
              <Route path="/repairs/add" element={<RepairForm />} />
              <Route path="/repairs/edit/:id" element={<RepairForm />} />

              {/* Staff Routes */}
              <Route path="/staff" element={<StaffList />} />
              <Route path="/staff/add" element={<StaffForm />} />
              <Route path="/staff/edit/:id" element={<StaffForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
