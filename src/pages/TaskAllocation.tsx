import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Autocomplete,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Sample data
const employees = [
  { id: 'EMP001', name: 'John Doe' },
  { id: 'EMP002', name: 'Jane Smith' },
  { id: 'EMP003', name: 'Alice Johnson' },
];

// Sample categories for tasks
const taskCategories = ['Design', 'Development', 'Testing', 'Research'];

const TaskAllocationPage = ({ loggedInUser }) => {
  const [task, setTask] = useState({
    employee: null,
    assigner: loggedInUser || null,
    title: '',
    description: '',
    deadline: '',
    category: 'Development',
    priority: 'Medium',
    status: 'Pending',
    notifyTeam: false,
    file: null, // For the file upload
  });

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const handleChange = (field) => (e) => {
    setTask({ ...task, [field]: e.target.value });
  };

  const handleEmployeeChange = (e, value) => {
    setTask({ ...task, employee: value });
  };

  const handleCategoryChange = (e) => {
    setTask({ ...task, category: e.target.value });
  };

  const handleFileChange = (e) => {
    setTask({ ...task, file: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (!task.employee || !task.title || !task.description || !task.deadline) {
      setAlert({ type: 'error', message: 'Please fill all fields' });
      setShowAlert(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editTaskIndex !== null) {
        const updatedTasks = [...assignedTasks];
        updatedTasks[editTaskIndex] = task;
        setAssignedTasks(updatedTasks);
        setEditTaskIndex(null);
      } else {
        setAssignedTasks([...assignedTasks, task]);
      }

      setTask({
        employee: null,
        assigner: loggedInUser || null,
        title: '',
        description: '',
        deadline: '',
        category: 'Development',
        priority: 'Medium',
        status: 'Pending',
        notifyTeam: false,
        file: null, // Reset file
      });

      setLoading(false);
      setAlert({ type: 'success', message: editTaskIndex !== null ? 'Task updated successfully!' : 'Task assigned successfully!' });
      setShowAlert(true);
    }, 2000);
  };

  const handleCloseAlert = () => setShowAlert(false);

  const handleTaskStatusChange = (index, status) => {
    const updatedTasks = [...assignedTasks];
    updatedTasks[index].status = status;
    setAssignedTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setTask({ ...assignedTasks[index] });
    setEditTaskIndex(index);
  };

  return (
    <Box p={4} height="100vh" bgcolor="#f5f5f5" display="flex" flexDirection="column" alignItems="center">
      {/* Alert */}
      {showAlert && (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}

      {/* Task Assignment Section */}
      <Paper sx={{ p: 3, maxWidth: 900, width: '100%', marginTop: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Typography variant="h5" color="primary" mb={3} textAlign="center">
          {editTaskIndex !== null ? 'Edit Task' : 'Assign New Task'}
        </Typography>

        <Grid container spacing={3}>
          {/* Employee Selection */}
          <Grid item xs={12}>
            <Autocomplete
              options={employees}
              getOptionLabel={(option) => `${option.name} (${option.id})`}
              renderInput={(params) => <TextField {...params} label="Select Employee" variant="outlined" fullWidth />}
              value={task.employee}
              onChange={handleEmployeeChange}
            />
          </Grid>

          {/* Task Title */}
          <Grid item xs={12}>
            <TextField
              label="Task Title"
              fullWidth
              value={task.title}
              onChange={handleChange('title')}
              variant="outlined"
            />
          </Grid>

          {/* Task Description */}
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={task.description}
              onChange={handleChange('description')}
              variant="outlined"
            />
          </Grid>

          {/* Task Deadline */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={task.deadline}
              onChange={handleChange('deadline')}
              variant="outlined"
            />
          </Grid>

          {/* Task Category */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={task.category} onChange={handleCategoryChange}>
                {taskCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* File Upload */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<AttachFileIcon />}
              fullWidth
              sx={{ padding: '12px', borderRadius: '8px' }}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {task.file && (
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                Selected file: {task.file.name}
              </Typography>
            )}
          </Grid>

          {/* Notify Team Option */}
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox checked={task.notifyTeam} onChange={handleChange('notifyTeam')} />}
              label="Notify Team Member"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ padding: '12px', borderRadius: '8px' }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : editTaskIndex !== null ? 'Save Changes' : 'Assign Task'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Assigned Tasks List */}
      <Paper sx={{ p: 3, maxWidth: 900, width: '100%', marginTop: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Typography variant="h6" color="primary" mb={2}>
          Assigned Tasks
        </Typography>

        {assignedTasks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No tasks assigned yet.
          </Typography>
        ) : (
          assignedTasks.map((task, index) => (
            <Box key={index} sx={{ mb: 2, padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <Typography variant="body1" fontWeight="bold">
                Employee: {task.employee.name} ({task.employee.id})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Task Title:</strong> {task.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Description:</strong> {task.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Deadline:</strong> {task.deadline}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Category:</strong> {task.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Status:</strong> {task.status}
              </Typography>
              <Button variant="outlined" color="secondary" onClick={() => handleEditTask(index)} sx={{ mt: 2 }}>
                Edit Task
              </Button>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default TaskAllocationPage;