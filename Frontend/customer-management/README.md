# Customer Management Module

This folder contains the React frontend for the Customer Management module.

## Files
- `CustomerList.jsx` - Component to display all customers with search functionality
- `CustomerForm.jsx` - Component for adding and editing customers

## Features
- View all customers
- Add new customers
- Edit existing customer information
- Delete customers
- Search customers by name, email, or phone
- Validation for required fields

## Customer Fields
- Customer ID (unique identifier)
- Full Name
- Phone Number
- Email Address
- Address
- National ID (NIC)

## API Integration
Connects to Customer Service API:
- Base URL: `http://localhost:8002`
- Service: `/api/customers`

## Usage
These components are imported and used in the main App.jsx with routes:
- `/customers` - Customer list page
- `/customers/add` - Add new customer page
- `/customers/edit/:id` - Edit customer page
