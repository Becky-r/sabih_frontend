import React, { useState } from 'react';
import {
  Box, Button, Typography, Grid, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import QRCode from 'react-qr-code';

const employees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Development',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    note: 'Important note for John Doe.',
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    position: 'Product Manager',
    department: 'Product',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    note: 'Note for Jane Smith to remember.',
  },
];

const EmployeeIDCard = ({ employee, frontDesign, backDesign }) => {
  if (!employee) return null;

  const frontBackground = frontDesign ? `url(${URL.createObjectURL(frontDesign)})` : '';
  const backBackground = backDesign ? `url(${URL.createObjectURL(backDesign)})` : '';

  return (
    <Grid container spacing={2} justifyContent="center" mb={4}>
      <Grid item>
        <Paper
          elevation={6}
          sx={{
            width: 320,
            height: 380,
            p: 3,
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: 3,
            backgroundImage: frontBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography fontWeight="bold" variant="h6">Employee ID - Front</Typography>
            <img
              src={employee.photo}
              alt={employee.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                marginTop: 20,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
              }}
            />
            <Typography variant="h6" mt={2} fontWeight="bold">{employee.name}</Typography>
            <Typography variant="body1">{employee.position}</Typography>
            <Typography variant="body2">{employee.department}</Typography>
            <Typography variant="caption">ID: {employee.id}</Typography>
            <Typography variant="body2" mt={2}>{employee.note}</Typography>
          </Box>
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            height: '100%', bgcolor: 'rgba(0,0,0,0.3)', zIndex: 1, borderRadius: '12px'
          }} />
        </Paper>
      </Grid>

      <Grid item>
        <Paper
          elevation={6}
          sx={{
            width: 320,
            height: 380,
            p: 3,
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: 3,
            backgroundImage: backBackground,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2, mt: 15 }}>
            <QRCode value={`https://company.com/employee/${employee.id}`} size={100} />
          </Box>
          <Box sx={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            height: '100%', bgcolor: 'rgba(0,0,0,0.2)', zIndex: 1, borderRadius: '12px'
          }} />
        </Paper>
      </Grid>
    </Grid>
  );
};

const IDGenerationPage = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState('');
  const [submitOpen, setSubmitOpen] = useState(false);
  const [frontDesign, setFrontDesign] = useState(null);
  const [backDesign, setBackDesign] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.position.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase()) ||
    emp.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDesignSubmit = () => {
    if (!frontDesign || !backDesign) {
      alert("Please upload both front and back designs.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert('Design submitted successfully!');
      setSubmitOpen(false);
      setFrontDesign(null);
      setBackDesign(null);
    }, 2000);
  };

  return (
    <Box p={4} minHeight="100vh" display="flex" flexDirection="column">
      <Typography variant="h4" textAlign="center" mb={4}>ID Generation</Typography>

      <EmployeeIDCard
        employee={selectedEmployee}
        frontDesign={frontDesign}
        backDesign={backDesign}
      />

      {selectedEmployee && (
        <Box textAlign="center" mb={4} display="flex" gap={2} justifyContent="center">
          <Button variant="contained" color="primary">Download ID</Button>
          <Button variant="outlined" color="secondary" onClick={() => setSubmitOpen(true)}>
            Submit ID Design
          </Button>
        </Box>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          label="Search Employees"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box flexGrow={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => setSelectedEmployee(emp)}>
                      Generate ID
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={submitOpen} onClose={() => setSubmitOpen(false)}>
        <DialogTitle>Submit ID Design</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Typography>Upload Front Design</Typography>
            <Button fullWidth variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload
              <input hidden type="file" accept="image/*" onChange={(e) => setFrontDesign(e.target.files[0])} />
            </Button>
            {frontDesign && <Typography variant="body2" mt={1}>{frontDesign.name}</Typography>}
          </Box>
          <Box mt={3}>
            <Typography>Upload Back Design</Typography>
            <Button fullWidth variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload
              <input hidden type="file" accept="image/*" onChange={(e) => setBackDesign(e.target.files[0])} />
            </Button>
            {backDesign && <Typography variant="body2" mt={1}>{backDesign.name}</Typography>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDesignSubmit} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IDGenerationPage;
