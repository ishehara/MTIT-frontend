# Staff Management Module

This folder contains the React frontend for the Staff Management module.

## Files
- `StaffList.jsx` - Component to display all staff members with availability tracking
- `StaffForm.jsx` - Component for adding and editing staff members

## Features
- View all staff members
- Add new staff members
- Edit staff information
- Delete staff records
- Search staff by name, specialty, or email
- Filter staff by availability status
- Track staff specialties and experience
- Monitor workload (number of assigned jobs)
- View availability status

## Staff Fields
- Full Name
- Email Address (optional)
- Phone Number
- Specialty
- Years of Experience
- Availability Status (Available/Unavailable)
- Current Workload (number of assigned jobs)

## Specialty Options
- General Repair
- Laptop Repair
- Mobile Phone Repair
- Desktop Computer Repair
- Printer Repair
- Hardware Specialist
- Software Specialist
- Network Technician

## Key Metrics
- Total Staff Count
- Available Staff Count
- Total Experience (sum of all staff experience)

## Availability Tracking
- **Available** (Green Badge) - Staff member is available for new assignments
- **Unavailable** (Red Badge) - Staff member is not available

## Workload Monitoring
- Shows current number of jobs assigned to each staff member
- Yellow highlight if workload is high (> 5 jobs)
- Helps in fair distribution of work

## API Integration
Connects to Staff Service API:
- Base URL: `http://localhost:8005`
- Service: `/api/staff`

## Usage
These components are imported and used in the main App.jsx with routes:
- `/staff` - Staff list page with filtering
- `/staff/add` - Add new staff member page
- `/staff/edit/:id` - Edit staff member page

## Staff Management Workflow
1. **Onboard**: Add new staff members with their specialties
2. **Assign**: Assign repair jobs based on specialty and availability
3. **Monitor**: Track workload and performance
4. **Update**: Modify staff information as needed
5. **Remove**: Delete staff records when necessary

## Notes
- Staff availability should be updated regularly
- Distribute workload evenly to avoid staff burnout
- Consider experience level when assigning complex repairs
