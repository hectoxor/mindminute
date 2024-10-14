// src/components/Flashcards.js

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Box, 
  Button, 
  CircularProgress,
  TextField 
} from '@mui/material';
import { generateFlashcards } from '../api';

const Flashcards = () => {
  const [text, setText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateFlashcards = async () => {
    if (!text.trim()) {
      setError('Please enter study material to generate flashcards.');
      return;
    }

    setLoading(true);
    setError('');
    setFlashcards([]);
    try {
      const fc = await generateFlashcards(text);
      console.log('Raw Flashcards Response:', fc); // For debugging

      if (!fc || !Array.isArray(fc)) {
        setError('Received invalid flashcards data from the server.');
        return;
      }

      // Filter out any flashcards that have 'N/A' in question or answer
      const validFlashcards = fc.filter(fcItem => fcItem.question !== 'N/A' && fcItem.answer !== 'N/A');

      if (validFlashcards.length === 0) {
        setError('No valid flashcards generated. Please try again with different study material.');
        return;
      }

      setFlashcards(validFlashcards);
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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generate Questions
      </Typography>
      <Box mb={2}>
        <TextField
          label="Enter study material"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          aria-label="Study Material Input"
        />
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerateFlashcards} 
        disabled={loading}
        aria-label="Generate Flashcards"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Flashcards'}
      </Button>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {flashcards.length > 0 && (
        <Grid container spacing={2} mt={2}>
          {flashcards.map((fc, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  {/* Flashcard Number */}
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Flashcard {index + 1}
                  </Typography>
                  {/* Flashcard Question */}
                  <Typography variant="subtitle1" component="div">
                    Q: {fc.question}
                  </Typography>
                  {/* Flashcard Answer */}
                  <Typography variant="body1" component="div" sx={{ mt: 1 }}>
                    A: {fc.answer}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Flashcards;
