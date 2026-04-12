# Computer Repair Shop Management System - Frontend

A comprehensive React-based frontend application for managing a computer repair shop with four main modules: Customer Management, Inventory Management, Repair Management, and Staff Management.

## Features

### 1. **Dashboard**
- Overview of all key metrics
- Quick access to all modules
- Statistics on total customers, inventory items, active repairs, and staff members
- Quick action buttons for common operations

### 2. **Customer Management** (`/customer-management`)
- **Create**: Register new customers with full contact information
- **Read**: View all customers with search functionality
- **Update**: Edit customer details
- **Delete**: Remove customer records
- Fields: Customer ID, Name, Phone, Email, Address, NIC

### 3. **Inventory Management** (`/inventory-management`)
- **Create**: Add new inventory items (parts, tools, equipment)
- **Read**: View all inventory with stock levels and valuation
- **Update**: Modify item details and quantities
- **Delete**: Remove inventory records
- Features:
  - Track stock quantities
  - Calculate total inventory value
  - Low stock alerts (< 5 units)
  - Supplier tracking
  - Warranty information
  - Item condition tracking

### 4. **Repair Management** (`/repair-management`)
- **Create**: Register new repair jobs with device and customer details
- **Read**: View all repairs with status filtering
- **Update**: Modify repair details and track progress
- **Delete**: Remove repair records
- Features:
  - Support for multiple device types (Laptop, Desktop, Smartphone, Tablet, etc.)
  - Status tracking (Not Started, Repairing, Finished, Handed Over)
  - Technician notes and progress tracking
  - Customer communication details
  - Repair history and timestamps

### 5. **Staff Management** (`/staff-management`)
- **Create**: Add new staff members
- **Read**: View all staff with specialties and availability
- **Update**: Modify staff information
- **Delete**: Remove staff records
- Features:
  - Specialty tracking (General Repair, Laptop Repair, Mobile Repair, etc.)
  - Experience tracking
  - Availability status
  - Workload monitoring
  - Contact information management

## Project Structure

```
Frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components for each module
│   │   ├── Dashboard.jsx
│   │   ├── CustomerList.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── InventoryList.jsx
│   │   ├── InventoryForm.jsx
│   │   ├── RepairList.jsx
│   │   ├── RepairForm.jsx
│   │   ├── StaffList.jsx
│   │   └── StaffForm.jsx
│   ├── services/           # API integration services
│   │   ├── customerService.js
│   │   ├── inventoryService.js
│   │   ├── repairService.js
│   │   └── staffService.js
│   ├── styles/
│   │   └── index.css       # Global styles
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── .env.example            # Example environment file
├── package.json
├── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to the Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` if not already done
   - Update the service URLs if they differ from local defaults

   ```bash
   VITE_GATEWAY_URL=http://localhost:8000
   VITE_CUSTOMER_SERVICE_URL=http://localhost:8002
   VITE_INVENTORY_SERVICE_URL=http://localhost:8003
   VITE_REPAIR_SERVICE_URL=http://localhost:8004
   VITE_STAFF_SERVICE_URL=http://localhost:8005
   ```

4. **Ensure backend services are running**
   - Make sure all 4 microservices are running on their respective ports:
     - Customer Service: 8002
     - Inventory Service: 8003
     - Repair Service: 8004
     - Staff Service: 8005

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:3000`

## Available Scripts

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build the production bundle
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint linter

## Technology Stack

- **React 18.2** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and development server
- **React Icons** - Icon library (FiEdit, FiTrash2, FiPlus, etc.)
- **Date-fns** - Date utility library
- **CSS3** - Styling (no external CSS frameworks)

## API Integration

The frontend communicates with four microservices via REST APIs:

### Customer Service (`/api/customers`)
```javascript
- POST   /customers              - Create customer
- GET    /customers              - List all customers
- GET    /customers/{id}         - Get customer by ID
- PUT    /customers/{id}         - Update customer
- DELETE /customers/{id}         - Delete customer
```

### Inventory Service (`/api/inventory`)
```javascript
- POST   /inventory              - Create item
- GET    /inventory              - List all items
- GET    /inventory/{id}         - Get item by ID
- PUT    /inventory/{id}         - Update item
- DELETE /inventory/{id}         - Delete item
```

### Repair Service (`/api/repairs`)
```javascript
- POST              /repairs                    - Create repair job
- GET               /repairs                    - List all repairs
- GET               /repairs/{id}               - Get repair by ID
- GET               /repairs/status/{status}    - Filter by status
- PUT               /repairs/{id}               - Update repair
- PATCH             /repairs/{id}/status        - Update status & notes
- DELETE            /repairs/{id}               - Delete repair
```

### Staff Service (`/api/staff`)
```javascript
- POST   /staff                  - Create staff
- GET    /staff                  - List all staff
- GET    /staff/{id}             - Get staff by ID
- PUT    /staff/{id}             - Update staff
- DELETE /staff/{id}             - Delete staff
```

## UI Features

### Navigation
- **Top Navbar** - Main navigation links for all modules
- **Sidebar** - Quick access to different sections with active state indicators
- **Breadcrumbs/Back Buttons** - Easy navigation back to list views

### Forms
- **Validation** - Client-side validation for required fields
- **Responsive** - Grid-based layout that adapts to screen size
- **User Feedback** - Success and error messages
- **Loading States** - Disabled buttons during submission

### Tables/Lists
- **Search Functionality** - Filter items by name, email, phone, etc.
- **Filtering** - Status filters for repairs and availability for staff
- **Pagination Ready** - Can be easily extended for pagination
- **Action Buttons** - Edit and delete operations with confirmation
- **Status Badges** - Visual indicators for various statuses

### Design
- **Professional UI** - Clean, modern design with consistent color scheme
- **Responsive Design** - Mobile-friendly layouts
- **Color Scheme**:
  - Primary: #667eea (Purple)
  - Success: #28a745 (Green)
  - Warning: #ffc107 (Yellow)
  - Danger: #dc3545 (Red)
  - Info: #17a2b8 (Cyan)

## Common Use Cases

### Register a New Customer
1. Click "Add Customer" button
2. Fill in customer details
3. Click "Create Customer"
4. Customer appears in the customer list

### Track Repair Progress
1. Go to Repairs module
2. Find repair job by customer or device
3. Click "Edit" to update job details or status
4. Use "Status & Notes" tab to update progress
5. Add technician notes

### Manage Inventory
1. Add items to inventory after receiving supplies
2. Monitor stock levels (low stock items highlighted)
3. Update quantities as items are used
4. Track total inventory value
5. View supplier information

### Schedule Staff
1. Add staff members with their specialties
2. Set availability status
3. Monitor workload (number of assigned jobs)
4. Update staff information as needed

## Error Handling

- API errors are displayed as alert messages
- Network errors are caught and displayed to user
- Form validation errors prevent submission
- Deletion confirmations prevent accidental data loss

## Future Enhancements

- User authentication and authorization
- Advanced reporting and analytics
- Export data to CSV/PDF
- Multi-user support with role-based access
- Real-time notifications
- Job assignment to technicians
- Payment tracking
- Backup and restore functionality
- Mobile app version

## Troubleshooting

### Frontend won't connect to backend
- Check if all microservices are running on correct ports
- Verify `.env` file has correct service URLs
- Check browser console for CORS errors

### Slow data loading
- Ensure MongoDB is running properly
- Check network connectivity
- Verify backend services are responsive

### Form submission errors
- Check if required fields are filled
- Verify data format matches backend requirements
- Check backend service logs for detailed errors

## Support

For issues or questions:
1. Check the backend service logs
2. Review the browser console for errors
3. Verify all services are running correctly
4. Check environment variable configuration

## License

This project is part of the MTIT Assignment 02 - Computer Repair Shop Management System.
