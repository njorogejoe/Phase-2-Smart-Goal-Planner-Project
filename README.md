# Phase-2-Event-Planner-Project
# Smart Goal Planner

A React-based financial goal tracking application that helps users manage and track their savings goals with an intuitive interface.

## Features

- **Goal Management**: Create, edit, and delete financial savings goals
- **Progress Tracking**: Visual progress bars and completion percentages
- **Deposit System**: Make deposits to specific goals
- **Status Indicators**: Visual alerts for overdue and near-deadline goals
- **Category Organization**: Organize goals by categories (Travel, Emergency, Electronics, etc.)
- **Overview Dashboard**: Summary cards showing total goals, savings, and completion status
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
smart-goal-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DepositForm.jsx
│   │   ├── GoalCard.jsx
│   │   ├── GoalForm.jsx
│   │   ├── GoalList.jsx
│   │   └── Overview.jsx
│   ├── App.jsx
│   ├── SmartGoalPlanner.jsx
│   ├── index.js
│   ├── styles.css
│   └── utils.js
├── db.json
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-goal-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the JSON server (for API simulation):
```bash
npm run server
```

4. In a new terminal, start the React application:
```bash
npm start
```

Or run both simultaneously:
```bash
npm run dev
```

## Usage

### Adding a New Goal
1. Click the "Add New Goal" button
2. Fill in the goal details:
   - Goal name
   - Target amount
   - Category
   - Deadline
3. Click "Save" to create the goal

### Making Deposits
1. Use the "Make a Deposit" form
2. Enter the amount and select the goal
3. Click "Make Deposit" to add funds to the goal

### Editing Goals
1. Click the edit icon on any goal card
2. Modify the goal details inline
3. Click the save icon to confirm changes

### Goal Status Indicators
- **Green**: Goal completed
- **Red**: Goal is overdue
- **Orange**: Deadline is approaching (within 30 days)
- **Blue**: Goal is on track

## Components

### App.jsx
Main application component that renders the Smart Goal Planner.

### SmartGoalPlanner.jsx
Core component containing the main application logic and state management.

### Overview.jsx
Dashboard component showing summary statistics (total goals, total saved, completed goals, etc.).

### GoalForm.jsx
Form component for adding new goals with validation.

### GoalCard.jsx
Individual goal display component with progress tracking, status indicators, and inline editing.

### GoalList.jsx
Container component that renders all goal cards or empty state.

### DepositForm.jsx
Form component for making deposits to existing goals.

## Data Structure

Goals are stored with the following structure:
```json
{
  "id": "unique-id",
  "name": "Goal Name",
  "targetAmount": 1000,
  "savedAmount": 250,
  "category": "Category",
  "deadline": "2025-12-31",
  "createdAt": "2024-01-15"
}
```

## API Endpoints (JSON Server)

- `GET /goals` - Fetch all goals
- `POST /goals` - Create a new goal
- `PATCH /goals/:id` - Update a specific goal
- `DELETE /goals/:id` - Delete a specific goal

## Styling

The application uses Tailwind CSS for styling with custom CSS for animations and enhanced user experience.

## Future Enhancements

- User authentication and personalization
- Goal categories with custom icons
- Progress notifications and reminders
- Export/import functionality
- Goal templates and recommendations
- Charts and analytics
- Mobile app version

