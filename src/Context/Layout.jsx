import React from "react";
import { Paper, Typography, Box, Card, CardContent, Checkbox, useTheme, useMediaQuery } from "@mui/material";
import Action from "./Action";

function Layout(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getPriorityColor = (level) => {
    switch (level) {
      case "High":
        return "#ffebee"; // light red
      case "Medium":
        return "#fff3e0"; // light orange
      case "Low":
        return "#e8f5e9"; // light green
      default:
        return "#ffffff";
    }
  };

  const tasks = props.getTasksByPriority(props.level);

  const handleTaskClick = (task) => {
    if (props.selectedTask === task) {
      props.setSelectedTask(null);
    } else {
      props.setSelectedTask(task);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: getPriorityColor(props.level),
        border: 1,
        borderColor: 'grey.300',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '300px',
        minWidth: '300px',
        overflowY: 'auto',
        mx: 'auto',
        ...(isMobile && {
          fontSize: '0.9rem',
          '& .MuiTypography-h6': {
            fontSize: '1.1rem'
          },
          '& .MuiTypography-body1': {
            fontSize: '0.9rem'
          }
        })
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
        {props.level} Priority
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: 2
      }}>
        {tasks.map((task) => (
          <Card 
            key={task.id}
            sx={{ 
              mb: 2,
              opacity: task.completed ? 0.7 : 1,
              transition: 'opacity 0.3s'
            }}
          >
            <CardContent sx={{ 
              py: 1, 
              '&:last-child': { pb: 1 },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Checkbox
                checked={task.completed}
                onChange={() => props.handleToggleComplete(task.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <Box 
                onClick={() => handleTaskClick(task)}
                sx={{ 
                  flex: 1,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary'
                }}
              >
                <Typography>
                  {task.text}
                </Typography>
              </Box>
            </CardContent>
            {props.selectedTask === task && (
              <Action
                priority={props.level}
                handleEditTask={props.handleEditTask}
                handleChangePriority={props.handleChangePriority}
                handleDeleteTask={props.handleDeleteTask}
                selectedTask={props.selectedTask}
              />
            )}
          </Card>
        ))}
        {tasks.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No {props.level.toLowerCase()} priority tasks
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default Layout;
