import { createSlice } from '@reduxjs/toolkit';

// Make sure to parse localStorage data safely
const getSavedTasks = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    return Array.isArray(tasks) ? tasks : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  tasks: getSavedTasks(),
  selectedTask: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, text } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.text = text;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    changePriority: (state, action) => {
      const { id, priority } = action.payload;
      // Handle both string and number IDs
      const taskId = typeof id === 'string' ? parseInt(id) : id;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex !== -1) {
        state.tasks[taskIndex].priority = priority;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  toggleComplete,
  changePriority,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;