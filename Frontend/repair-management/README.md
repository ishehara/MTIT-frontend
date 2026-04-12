# Repair Management Module

This folder contains the React frontend for the Repair Management module.

## Files
- `RepairList.jsx` - Component to display all repair jobs with status filtering
- `RepairForm.jsx` - Component for registering and managing repair jobs

## Features
- Register new repair jobs
- View all repairs with detailed device and customer information
- Edit repair job details
- Track repair status progression
- Add technician notes
- Delete repair records
- Filter repairs by status or customer
- Search repairs by customer name, device, or model
- Visual status indicators with color coding

## Repair Status Tracking
- **Not Started** (Gray) - Repair job registered but work hasn't begun
- **Repairing** (Yellow) - Work is in progress
- **Finished** (Green) - Repair work completed
- **Handed Over** (Cyan) - Device delivered to customer

## Job Fields
### Customer Information
- Customer Name
- Customer Phone
- Customer Email (optional)

### Device Information
- Device Type (Laptop, Desktop, Smartphone, Tablet, Monitor, Printer, Other)
- Device Brand
- Device Model
- Issue Description

### Progress Tracking
- Current Status
- Technician Notes
- Created/Updated Timestamps

## Key Metrics
- Total Repairs Count
- Active Jobs (in progress)
- Completed Jobs (handed over)

## API Integration
Connects to Repair Service API:
- Base URL: `http://localhost:8004`
- Service: `/api/repairs`
- Endpoints:
  - POST `/repairs` - Register new repair
  - GET `/repairs` - List all repairs
  - GET `/repairs/:id` - Get repair by ID
  - GET `/repairs/status/:status` - Filter by status
  - PUT `/repairs/:id` - Update repair details
  - PATCH `/repairs/:id}/status` - Update repair status and notes
  - DELETE `/repairs/:id` - Delete repair

## Usage
These components are imported and used in the main App.jsx with routes:
- `/repairs` - Repair list page with filtering
- `/repairs/add` - Register new repair page
- `/repairs/edit/:id` - Edit repair job page (with tabs for details and status)

## Workflow
1. **Register**: Customer brings device → Register repair job
2. **Track**: Monitor progress through different statuses
3. **Update**: Add technician notes as work progresses
4. **Complete**: Mark as finished when repairs are done
5. **Handover**: Mark as handed over when customer picks up device
