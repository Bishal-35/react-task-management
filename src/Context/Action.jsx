import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { 
  Box, 
  Button, 
  ButtonGroup, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from "@mui/material";
import { Edit, SwapVert, Delete } from "@mui/icons-material";
import { editTask, changePriority, deleteTask, setSelectedTask } from '../redux/taskSlice';

const Action = ({ priority, selectedTask }) => {
  const dispatch = useDispatch();
  const [openPriorityDialog, setOpenPriorityDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newPriority, setNewPriority] = useState(priority);
  const [editedText, setEditedText] = useState(selectedTask?.text || "");

  // If no selected task, don't render anything
  if (!selectedTask) return null;

  // Priority dialog handlers
  const handleOpenPriorityDialog = () => {
    setOpenPriorityDialog(true);
    setNewPriority(priority);
  };

  const handleClosePriorityDialog = () => {
    setOpenPriorityDialog(false);
  };

  const handleChangePriority = () => {
    if (!newPriority) return;
    dispatch(changePriority({ id: selectedTask.id, priority: newPriority }));
    dispatch(setSelectedTask(null));
    setOpenPriorityDialog(false);
  };

  // Edit dialog handlers
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    setEditedText(selectedTask.text);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditTask = () => {
    if (!editedText.trim()) return;
    dispatch(editTask({ id: selectedTask.id, text: editedText.trim() }));
    dispatch(setSelectedTask(null));
    setOpenEditDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(selectedTask.id));
    dispatch(setSelectedTask(null));
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <ButtonGroup variant="contained" size="small" aria-label="task actions" fullWidth>
          <Button
            startIcon={<Edit />}
            onClick={handleOpenEditDialog}
            color="primary"
          >
            Edit
          </Button>
          <Button
            startIcon={<SwapVert />}
            onClick={handleOpenPriorityDialog}
            color="info"
          >
            Priority
          </Button>
          <Button
            startIcon={<Delete />}
            onClick={handleDelete}
            color="error"
          >
            Delete
          </Button>
        </ButtonGroup>
      </Box>

      {/* Priority Change Dialog */}
      <Dialog open={openPriorityDialog} onClose={handleClosePriorityDialog}>
        <DialogTitle>Change Priority</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
            >
              <FormControlLabel value="High" control={<Radio />} label="High Priority" />
              <FormControlLabel value="Medium" control={<Radio />} label="Medium Priority" />
              <FormControlLabel value="Low" control={<Radio />} label="Low Priority" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePriorityDialog} color="inherit">Cancel</Button>
          <Button onClick={handleChangePriority} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="inherit">Cancel</Button>
          <Button 
            onClick={handleEditTask} 
            color="primary" 
            variant="contained"
            disabled={editedText.trim() === ""}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Action;
