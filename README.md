# Employee Dashboard

A modern React-based employee management dashboard with search, view, and delete functionality.

## Features

- 📊 Employee Dashboard: View all employees in a card-based layout
- 🔍 **Search by ID**: Find employees quickly using their ID
- 👤 **Employee Details**: Click on any card to view detailed employee information
- 🗑️ **Delete Functionality**: Remove employees from the state (single or bulk)
- ✏️ **Edit Button**: Placeholder for future edit functionality
- ☑️ **Multi-Select**: Select multiple cards and delete them at once
- 🎨 **Modern UI**: Built with Tailwind CSS for a beautiful, responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Main dashboard with employee cards
│   └── EmployeeDetail.jsx # Individual employee detail page
├── App.jsx                # Main app component with routing
├── main.jsx               # Entry point
└── index.css              # Global styles with Tailwind
```

## Usage

1. **View Employees**: All employees are displayed as cards on the dashboard
2. **Search**: Enter an employee ID in the search bar and click "Search"
3. **View Details**: Click on any employee card to see their detailed information
4. **Delete Single**: Click the "Delete" button on any card to remove it
5. **Delete Multiple**: 
   - Select cards using the checkboxes
   - Click "Select All" to select all visible cards
   - Click "Delete Selected" to remove all selected cards

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite

## API

The application uses the Dummy REST API:
- Endpoint: `https://dummy.restapiexample.com/api/v1/employees`
- The app includes fallback data if the API is unavailable

