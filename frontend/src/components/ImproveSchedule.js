// src/components/ImproveSchedule.js

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import { improveSchedule } from '../api';

const ImproveSchedule = () => {
  const [scheduleData, setScheduleData] = useState({
    current_schedule: '',
    study_hours: '',
    subjects: '',
    preferred_times: '',
    stress_level: '',
    stress_relief_activities: '',
    additional_notes: '',
  });
  const [improvedSchedule, setImprovedSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImprovedSchedule(null);
    try {
      // Convert comma-separated strings to arrays
      const dataToSend = {
        ...scheduleData,
        study_hours: parseInt(scheduleData.study_hours, 10),
        subjects: scheduleData.subjects.split(',').map((s) => s.trim()),
        preferred_times: scheduleData.preferred_times.split(',').map((s) => s.trim()),
        stress_relief_activities: scheduleData.stress_relief_activities.split(',').map((s) => s.trim()),
      };
      const improved = await improveSchedule(dataToSend);
      if (improved.warning) {
        setError(improved.warning);
      }
      setImprovedSchedule(improved.improved_schedule);
    } catch (err) {
      // Enhanced error handling based on Axios error structure
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data.error || 'Server error occurred.');
      } else if (err.request) {
        // Request was made but no response received
        setError('No response from server. Please check your backend.');
      } else {
        // Something else happened
        setError('An unexpected error occurred.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render the schedule table
  const renderScheduleTable = () => {
    if (!improvedSchedule || !improvedSchedule.schedule) return null;

    return (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Improved Schedule:
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="improved schedule table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Day</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Activity</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {improvedSchedule.schedule.map((daySchedule, dayIndex) => (
                daySchedule.tasks.map((task, taskIndex) => (
                  <TableRow key={`${dayIndex}-${taskIndex}`}>
                    {taskIndex === 0 && (
                      <TableCell rowSpan={daySchedule.tasks.length}>
                        {daySchedule.day}
                      </TableCell>
                    )}
                    <TableCell>{task.time}</TableCell>
                    <TableCell>{task.activity}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  // Helper function to render raw text schedule
  const renderRawSchedule = () => {
    if (!improvedSchedule || typeof improvedSchedule !== 'string') return null;

    return (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Improved Schedule (Raw Text):
        </Typography>
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
          {improvedSchedule}
        </Typography>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Improve Study Schedule
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Current Schedule"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="current_schedule"
          value={scheduleData.current_schedule}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Current Schedule Input"
        />
        <TextField
          label="Study Hours per Day"
          variant="outlined"
          fullWidth
          type="number"
          name="study_hours"
          value={scheduleData.study_hours}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Study Hours Input"
        />
        <TextField
          label="Subjects/Courses (comma-separated)"
          variant="outlined"
          fullWidth
          name="subjects"
          value={scheduleData.subjects}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Subjects Input"
        />
        <TextField
          label="Preferred Study Times (comma-separated)"
          variant="outlined"
          fullWidth
          name="preferred_times"
          value={scheduleData.preferred_times}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Preferred Study Times Input"
        />
        <TextField
          label="Current Stress Level"
          variant="outlined"
          fullWidth
          name="stress_level"
          value={scheduleData.stress_level}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Stress Level Input"
        />
        <TextField
          label="Preferred Stress Relief Activities (comma-separated)"
          variant="outlined"
          fullWidth
          name="stress_relief_activities"
          value={scheduleData.stress_relief_activities}
          onChange={handleChange}
          margin="normal"
          required
          aria-label="Stress Relief Activities Input"
        />
        <TextField
          label="Additional Notes"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          name="additional_notes"
          value={scheduleData.additional_notes}
          onChange={handleChange}
          margin="normal"
          aria-label="Additional Notes Input"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={loading} aria-label="Improve Schedule Button">
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Improve Schedule'}
          </Button>
        </Box>
      </form>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {improvedSchedule && improvedSchedule.schedule && renderScheduleTable()}
      {improvedSchedule && typeof improvedSchedule === 'string' && renderRawSchedule()}
    </Container>
  );
};

export default ImproveSchedule;
