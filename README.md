# React Task Management App

A modern, feature-rich task management application built with React, Material-UI, and Redux that helps you organize tasks based on priority levels.

## Features

- Create, edit, and delete tasks
- Organize tasks by priority (High, Medium, Low)
- Mark tasks as complete/incomplete
- Filter tasks by completion status
- Sort tasks by priority, date, or status
- Responsive design for all devices
- Local storage persistence
- Color-coded priority sections
- Redux state management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/Bishal-35/react-task-management.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- React.js
- Redux Toolkit
- Material-UI (MUI)
- React Beautiful DnD
- Local Storage API

## Core Functionality

- **Add Task:** Enter task text and select priority
- **Edit Task:** Click on a task to modify its text or priority
- **Delete Task:** Remove unwanted tasks
- **Complete Task:** Check/uncheck tasks to mark them as done
- **Priority Management:** Organize tasks in High, Medium, and Low priority sections
- **Task Filtering:** Show/hide completed or incomplete tasks
- **Task Sorting:** Sort by priority, date added, or completion status

## Project Structure

```
src/  
├── Context/
    ├── Action.jsx
│   ├── Layout.jsx
│   └── TaskDashboard.jsx
├── redux/
│   ├── store.jsx
│   └── taskSlice.jsx
└── App.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production




## License

MIT License

## Acknowledgments

- Thanks to the React and Material-UI teams for their excellent documentation and components
- Special thanks to the open-source community for their contributions and helping me build this project.


