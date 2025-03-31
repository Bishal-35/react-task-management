import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import { Sort } from '@mui/icons-material';
import { DragDropContext } from 'react-beautiful-dnd';
import Layout from './Layout';
import { addTask, changePriority } from '../redux/taskSlice';

const TaskDashboard = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);

    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState('none');
    const [sortBy, setSortBy] = useState('priority');
    const [sortDirection, setSortDirection] = useState('asc');
    const [filters, setFilters] = useState({
        showCompleted: true,
        showIncomplete: true
    });

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim() || priority === 'none') return;

        const task = {
            id: Date.now(),
            text: newTask,
            priority: priority,
            completed: false,
        };

        dispatch(addTask(task));
        setNewTask('');
        setPriority('none');
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

    const getPriorityColor = (level) => {
        switch (level) {
            case "High":
                return "#ffebee";
            case "Medium":
                return "#fff3e0";
            case "Low":
                return "#e8f5e9";
            default:
                return "#ffffff";
        }
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Return if dropped outside or same position
        if (!destination || 
            (destination.droppableId === source.droppableId && 
             destination.index === source.index)) {
            return;
        }

        // Update task priority
        const taskId = parseInt(draggableId);
        dispatch(changePriority({
            id: taskId,
            priority: destination.droppableId
        }));
    };

    return (
        <Container
            maxWidth="lg"
            sx={{
                p: { xs: 2, sm: 3, md: 4 },  // Responsive padding
                textAlign: 'center'
            }}
        >
            {/* App Title */}
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontWeight: 'bold',
                    color: 'primary.main',
                    fontSize: {
                        xs: '1.5rem',    // Smaller on mobile
                        sm: '1.75rem',   // Medium on tablet
                        md: '2.25rem'    // Larger on desktop
                    },
                    lineHeight: 1.2,   // Better readability
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                }}
            >
                Task Management App
            </Typography>

            {/* Input Container */}
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 3 },  // Responsive padding
                    mb: { xs: 3, sm: 4, md: 5 },  // Responsive margin
                    maxWidth: '800px',
                    mx: 'auto',
                    width: '100%'  // Full width on mobile
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 1.5, sm: 2 }}  // Responsive spacing
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                        <TextField
                            fullWidth
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter task"
                            label="Enter task"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <FormControl sx={{ width: '100%', minWidth: '180px' }}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
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
                                        borderLeft: '4px solid #f44336',
                                        '&:hover': {
                                            borderLeft: '4px solid #f44336',
                                        }
                                    }}
                                >
                                    High Priority
                                </MenuItem>
                                <MenuItem
                                    value="Medium"
                                    sx={{
                                        borderLeft: '4px solid #ff9800',
                                        '&:hover': {
                                            borderLeft: '4px solid #ff9800',
                                        }
                                    }}
                                >
                                    Medium Priority
                                </MenuItem>
                                <MenuItem
                                    value="Low"
                                    sx={{
                                        borderLeft: '4px solid #4caf50',
                                        '&:hover': {
                                            borderLeft: '4px solid #4caf50',
                                        }
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
                            onClick={handleAddTask}
                            fullWidth
                            sx={{ height: '56px' }}
                        >
                            Add Task
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Filters and Sorting */}
            <Box
                sx={{
                    mb: { xs: 3, sm: 4 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 },
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'  // Full width on mobile
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
                    <Tooltip title="Change sort: Priority ↔ Date ↔ Status">
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

            {/* Task Lists Section Title */}
            <Typography 
                variant="h5" 
                sx={{ 
                    mt: { xs: 2, sm: 3 },          // Responsive top margin
                    mb: { xs: 2, sm: 3 },          // Responsive bottom margin
                    fontWeight: 600,
                    color: 'text.primary',
                    fontSize: {                     // Responsive font size
                        xs: '1.25rem',             // Smaller on mobile
                        sm: '1.5rem',              // Medium on tablet
                        md: '1.75rem'              // Larger on desktop
                    },
                    textAlign: 'center',           // Center align text
                    width: '100%'                  // Full width
                }}
            >
                Your Tasks
            </Typography>

            {/* Task Lists Grid */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Grid
                        container
                        spacing={3}
                        sx={{ 
                            justifyContent: 'space-evenly',
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}
                    >
                        {['High', 'Medium', 'Low'].map((level) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                key={level}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Layout
                                    level={level}
                                    getPriorityColor={getPriorityColor}
                                    getTasksByPriority={getFilteredAndSortedTasks}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DragDropContext>
        </Container>
    );
};

export default TaskDashboard;