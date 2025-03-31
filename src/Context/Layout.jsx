import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, Box, Card, CardContent, Checkbox, useTheme, useMediaQuery } from "@mui/material";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Action from "./Action";
import { setSelectedTask, toggleComplete } from '../redux/taskSlice';

function Layout({ level, getPriorityColor, getTasksByPriority }) {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const tasks = getTasksByPriority(level);

  const handleTaskClick = (task) => {
    if (selectedTask === task) {
      dispatch(setSelectedTask(null));
    } else {
      dispatch(setSelectedTask(task));
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: getPriorityColor(level),
        border: 1,
        borderColor: 'grey.300',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: {
          xs: '100%',     // Full width on mobile
          md: '300px'     // Original fixed width on desktop
        },
        minWidth: {
          xs: '250px',    // Fixed minimum width on mobile/tablet
          md: '300px'     // Original minimum width on desktop
        },
        maxWidth: {
          xs: '90%',      // Don't exceed container width on mobile
          md: '90%'      // Original max width on desktop
        },
        mx: 'auto',
        overflowY: 'auto',
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
        {level} Priority
      </Typography>
      
      <Droppable droppableId={level}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              flexGrow: 1,
              width: '100%',
              padding: 1
            }}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                      width: '100%',
                      mb: 1
                    }}
                  >
                    <Card
                      sx={{
                        width: '100%',
                        opacity: task.completed ? 0.7 : 1,
                        transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
                        transition: 'opacity 0.3s, transform 0.2s',
                        '&:hover': { boxShadow: 3 }
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
                          onChange={() => dispatch(toggleComplete(task.id))}
                          onClick={(e) => e.stopPropagation()}
                          size={isMobile ? 'small' : 'medium'}
                        />
                        <Box 
                          onClick={() => handleTaskClick(task)}
                          sx={{ 
                            flex: 1, // Take remaining space
                            cursor: 'pointer',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                            {task.text}
                          </Typography>
                        </Box>
                      </CardContent>
                      {selectedTask === task && (
                        <Action
                          priority={level}
                          selectedTask={task}
                        />
                      )}
                    </Card>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                No {level.toLowerCase()} priority tasks
              </Typography>
            )}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
}

export default Layout;
