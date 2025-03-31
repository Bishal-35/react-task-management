import React, { useEffect, useState } from "react";
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Container, 
  Grid,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Stack,
  IconButton,
  Tooltip
} from "@mui/material";
import { Sort } from "@mui/icons-material";
import Layout from "./Layout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState(() => {
    // Initialize tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("none");
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    showCompleted: true,
    showIncomplete: true
  });
  const [sortBy, setSortBy] = useState('priority'); // 'priority', 'date', 'status'
  const [sortDirection, setSortDirection] = useState('asc');

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle input change
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };
  
  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleTaskSubmit = () => {
    if (textInput.trim() === "" || selectedPriority === "none") {
      return;
    }
    
    const newTask = {
      id: Date.now(),
      text: textInput,
      priority: selectedPriority,
      completed: false // Add completed property
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    // Reset form
    setTextInput("");
    setSelectedPriority("none");
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleFilterChange = (filterName) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleSortChange = () => {
    if (sortBy === 'priority') {
      setSortBy('date');
    } else if (sortBy === 'date') {
      setSortBy('status');
    } else {
      setSortBy('priority');
    }
  };

  const getFilteredAndSortedTasks = (priority) => {
    let filteredTasks = tasks.filter(task => task.priority === priority);

    // Apply status filters
    filteredTasks = filteredTasks.filter(task => 
      (task.completed && filters.showCompleted) || 
      (!task.completed && filters.showIncomplete)
    );

    // Apply sorting
    return filteredTasks.sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
      }
      if (sortBy === 'status') {
        return sortDirection === 'asc' 
          ? Number(a.completed) - Number(b.completed)
          : Number(b.completed) - Number(a.completed);
      }
      // Default priority sorting
      const priorities = { High: 3, Medium: 2, Low: 1 };
      return sortDirection === 'asc'
        ? priorities[a.priority] - priorities[b.priority]
        : priorities[b.priority] - priorities[a.priority];
    });
  };

  return (
    <Container maxWidth="lg" sx={{ p: 4, textAlign: 'center' }}>
      {/* App Title */}
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },  // Responsive margin bottom
          fontWeight: 'bold',
          color: 'primary.main',
          fontSize: {
            xs: '1.75rem',  // Smaller font size on mobile
            sm: '2rem',     // Medium font size on tablets
            md: '2.5rem'    // Larger font size on desktop
          },
          textAlign: 'center',
          wordBreak: 'break-word', // Ensures text wraps properly on small screens
          overflow: 'hidden',      // Prevents overflow issues
        }}
      >
        Task Management App
      </Typography>

      {/* Input Container */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 5,
          maxWidth: '800px',
          mx: 'auto' // Center the paper
        }}
      >
        <Grid 
          container 
          spacing={2} 
          justifyContent="center" 
          alignItems="center"
        >
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <TextField
              fullWidth
              value={textInput}
              onChange={handleTextInputChange}
              placeholder="Enter task"
              label="Enter task"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4} sx={{ 
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center' // Center the FormControl in its Grid item
          }}>
            <FormControl 
              sx={{ 
                width: '100%',
                minWidth: '180px' // Fixed width for the FormControl
              }}
            >
              <InputLabel>Priority</InputLabel>
              <Select
                value={selectedPriority}
                onChange={handlePriorityChange}
                label="Priority"
                MenuProps={{
                  PaperProps: {
                    style: {
                      width: '250px',
                      maxWidth: '100%'
                    }
                  }
                }}
              >
                <MenuItem value="none" disabled>
                  Select Priority
                </MenuItem>
                <MenuItem 
                  value="High" 
                  sx={{ 
                    borderLeft: '4px solid #f44336'
                  }}
                >
                  High Priority
                </MenuItem>
                <MenuItem 
                  value="Medium" 
                  sx={{ 
                    borderLeft: '4px solid #ff9800'
                  }}
                >
                  Medium Priority
                </MenuItem>
                <MenuItem 
                  value="Low" 
                  sx={{ 
                    borderLeft: '4px solid #4caf50'
                  }}
                >
                  Low Priority
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleTaskSubmit}
              fullWidth
              sx={{ height: '56px' }} // Match height with other inputs
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filters and Sorting */}
      <Box 
        sx={{ 
          mb: 4, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <FormGroup 
          row 
          sx={{ 
            mr: { sm: 2 },
            justifyContent: 'center'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showCompleted}
                onChange={() => handleFilterChange('showCompleted')}
              />
            }
            label="Show Completed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.showIncomplete}
                onChange={() => handleFilterChange('showIncomplete')}
              />
            }
            label="Show Incomplete"
          />
        </FormGroup>
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center"
          sx={{
            bgcolor: 'background.paper',
            px: 2,
            py: 0.5,
            borderRadius: 1,
            boxShadow: 1
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              minWidth: '80px',
              textTransform: 'capitalize'
            }}
          >
            Sort by: {sortBy}
          </Typography>
          <Tooltip title="Change sort: Priority → Date → Status">
            <IconButton 
              onClick={handleSortChange} 
              size="small"
              sx={{ 
                bgcolor: 'action.selected',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Sort />
            </IconButton>
          </Tooltip>
          <IconButton 
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
            size="small"
            sx={{ 
              bgcolor: 'action.selected',
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </IconButton>
        </Stack>
      </Box>

      {/* Task Lists Section */}
      <Typography 
        variant="h5" 
        sx={{ 
          mt: 3,
          mb: 3,
          fontWeight: 'medium'
        }}
      >
        Your Tasks
      </Typography>

      {/* Task Lists Grid */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid 
          container 
          spacing={3}
          sx={{ 
            justifyContent: 'space-evenly',
            maxWidth: '1200px'
          }}
        >
          {['High', 'Medium', 'Low'].map((level) => (
            <Grid item xs={12} sm={6} md={4} key={level}>
              <Layout
                getTasksByPriority={getFilteredAndSortedTasks}
                level={level}
                setSelectedTask={setSelectedTask}
                selectedTask={selectedTask}
                handleEditTask={handleEditTask}
                handleChangePriority={handleChangePriority}
                handleDeleteTask={handleDeleteTask}
                handleToggleComplete={handleToggleComplete}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TaskDashboard;
