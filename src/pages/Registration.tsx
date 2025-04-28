import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const roleChoices = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'supervisor', label: 'Supervisor' },
];

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const [userForm, setUserForm] = useState(() => JSON.parse(localStorage.getItem('userForm')) || {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [employeeForm, setEmployeeForm] = useState({
    user: '', name: '', type: '', email: '', phone: '', address: '', dob: '', position: '',
    department: '', date_hired: '', role: '', is_active: false, start_date: '', end_date: '', photo: null,
  });

  useEffect(() => {
    localStorage.setItem('userForm', JSON.stringify(userForm));
  }, [userForm]);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setEmployeeForm((prev) => ({ ...prev, [name]: val }));

    if (name === 'user') {
      const selectedUser = users.find((u) => u.username === value);
      if (selectedUser) {
        setEmployeeForm((prev) => ({ ...prev, email: selectedUser.email }));
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleUserRegister = (e) => {
    e.preventDefault();
    if (userForm.password !== userForm.confirmPassword) {
      return setSnack({ open: true, message: 'Passwords do not match!', severity: 'error' });
    }
    const newUser = { username: userForm.username, email: userForm.email };
    setUsers((prev) => [...prev, newUser]);
    setEmployeeForm((prev) => ({ ...prev, user: newUser.username, email: newUser.email }));
    setStep(2);
    setSnack({ open: true, message: 'User registered successfully!', severity: 'success' });
  };

  const handleEmployeeRegister = () => {
    console.log('Employee Data:', employeeForm);
    setConfirmOpen(false);
    setSnack({ open: true, message: 'Employee registered successfully!', severity: 'success' });
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', p: 2 }}>
      <Paper elevation={6} sx={{ width: '100%', maxWidth: 750, p: 4, borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 1, color: '#333' }}>
          {step === 1 ? 'User Registration' : 'Employee Registration'}
        </Typography>
        <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 3 }}>
          <Step><StepLabel>User</StepLabel></Step>
          <Step><StepLabel>Employee</StepLabel></Step>
        </Stepper>

        {step === 1 ? (
          <form onSubmit={handleUserRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Username" name="username" value={userForm.username} onChange={handleUserChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Email" name="email" type="email" value={userForm.email} onChange={handleUserChange} required error={!/\S+@\S+\.\S+/.test(userForm.email)} helperText={!/\S+@\S+\.\S+/.test(userForm.email) ? 'Enter a valid email' : ' '} /></Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={userForm.password} onChange={handleUserChange} required InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={togglePasswordVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Confirm Password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={userForm.confirmPassword} onChange={handleUserChange} required />
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, py: 1.3, fontWeight: 'bold', backgroundColor: '#4B0082', color: '#fff', '&:hover': { backgroundColor: '#3b006e' } }}>Register User</Button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setConfirmOpen(true); }}>
            <Grid container spacing={2}>
              <Grid item xs={12}><FormControl fullWidth required><InputLabel>User</InputLabel><Select name="user" value={employeeForm.user} onChange={handleEmployeeChange} label="User">{users.map((u) => <MenuItem key={u.username} value={u.username}>{u.username}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12}><TextField fullWidth label="Full Name" name="name" value={employeeForm.name} onChange={handleEmployeeChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Type" name="type" value={employeeForm.type} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Email" name="email" value={employeeForm.email} disabled /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Phone" name="phone" value={employeeForm.phone} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Address" name="address" value={employeeForm.address} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="DOB" name="dob" type="date" InputLabelProps={{ shrink: true }} value={employeeForm.dob} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Date Hired" name="date_hired" type="date" InputLabelProps={{ shrink: true }} value={employeeForm.date_hired} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Position" name="position" value={employeeForm.position} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="Department" name="department" value={employeeForm.department} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={12}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role" value={employeeForm.role} onChange={handleEmployeeChange} label="Role">{roleChoices.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12}><FormGroup><FormControlLabel control={<Checkbox name="is_active" checked={employeeForm.is_active} onChange={handleEmployeeChange} />} label="Is Active" /></FormGroup></Grid>
              <Grid item xs={6}><TextField fullWidth label="Start Date" name="start_date" type="date" InputLabelProps={{ shrink: true }} value={employeeForm.start_date} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={6}><TextField fullWidth label="End Date" name="end_date" type="date" InputLabelProps={{ shrink: true }} value={employeeForm.end_date} onChange={handleEmployeeChange} /></Grid>
              <Grid item xs={12}><Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>Upload Photo<input type="file" name="photo" accept="image/*" hidden onChange={handleEmployeeChange} /></Button></Grid>
              {employeeForm.photo && <Grid item xs={12}><Box sx={{ textAlign: 'center' }}><img src={URL.createObjectURL(employeeForm.photo)} alt="Preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 10 }} /></Box></Grid>}
            </Grid>
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, py: 1.3, fontWeight: 'bold', backgroundColor: '#4B0082', color: '#fff', '&:hover': { backgroundColor: '#3b006e' } }}>Register Employee</Button>
          </form>
        )}

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Registration?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleEmployeeRegister} autoFocus>Confirm</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((prev) => ({ ...prev, open: false }))}>
          <Alert onClose={() => setSnack((prev) => ({ ...prev, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>{snack.message}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;