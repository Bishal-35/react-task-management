import React, { useState } from "react";
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

const Action = (props) => {
  const [openPriorityDialog, setOpenPriorityDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newPriority, setNewPriority] = useState(props.priority);
  const [editedText, setEditedText] = useState(props.selectedTask ? props.selectedTask.text : "");

  // Priority dialog handlers
  const handleOpenPriorityDialog = () => {
    setOpenPriorityDialog(true);
    setNewPriority(props.priority);
  };

  const handleClosePriorityDialog = () => {
    setOpenPriorityDialog(false);
  };

  const handleChangePriority = () => {
    props.handleChangePriority(newPriority);
    setOpenPriorityDialog(false);
  };

  // Edit dialog handlers
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    setEditedText(props.selectedTask.text);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleEditTask = () => {
    if (editedText.trim() !== "") {
      props.handleEditTask(editedText);
    }
    setOpenEditDialog(false);
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
            onClick={props.handleDeleteTask}
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
