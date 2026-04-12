# Inventory Management Module

This folder contains the React frontend for the Inventory Management module.

## Files
- `InventoryList.jsx` - Component to display all inventory items with stock tracking
- `InventoryForm.jsx` - Component for adding and editing inventory items

## Features
- View all inventory items
- Add new inventory items (parts, tools, equipment)
- Edit existing items
- Delete inventory records
- Search inventory by name, supplier, or description
- Low stock alerts (items with quantity < 5)
- Calculate total inventory value
- Track item condition and warranty

## Inventory Fields
- Item Name
- Description
- Quantity (stock level)
- Unit Price
- Supplier
- Condition (New, Used, Refurbished, Damaged)
- Warranty Period

## Key Metrics
- Total Items Count
- Total Inventory Value (Rs)
- Low Stock Items Count

## API Integration
Connects to Inventory Service API:
- Base URL: `http://localhost:8003`
- Service: `/api/inventory`

## Usage
These components are imported and used in the main App.jsx with routes:
- `/inventory` - Inventory list page
- `/inventory/add` - Add new item page
- `/inventory/edit/:id` - Edit item page

## Stock Management
- Low stock warning: Items with quantity < 5 are highlighted in yellow
- Total value calculation: Updates automatically as quantities change
- Supplier tracking: Easy to see which supplier provided each item
