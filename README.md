# React Task Management App

A simple and intuitive task management application built with React and Material-UI that helps you organize tasks based on priority levels.

## Features

- Create, edit, and delete tasks
- Organize tasks by priority (High, Medium, Low)
- Mark tasks as complete/incomplete
- Responsive design for all devices
- Local storage persistence
- Color-coded priority sections

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Vercel CLI (optional for local deployment)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-task-management.git
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

## Deployment on Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   - Using Vercel CLI:
     ```bash
     vercel
     ```
   - OR using Vercel Dashboard:
     1. Push your code to GitHub
     2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
     3. Import your GitHub repository
     4. Click "Deploy"

## Technologies Used

- React.js
- Material-UI
- Local Storage API
- Vercel (hosting)

## Core Functionality

- **Add Task:** Enter task text and select priority
- **Edit Task:** Click on a task to modify its text or priority
- **Delete Task:** Remove unwanted tasks
- **Complete Task:** Check/uncheck tasks to mark them as done
- **Priority Management:** Organize tasks in High, Medium, and Low priority sections

## Project Structure

```
src/
├── Components/
│   └── Action.jsx
├── Context/
│   ├── Layout.jsx
│   └── TaskDashboard.jsx
└── App.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first.

## License

MIT License

## Acknowledgments

- Thanks to the React and Material-UI teams for their excellent documentation and components
- Special thanks to the open-source community for their contributions and helping me building this project.


