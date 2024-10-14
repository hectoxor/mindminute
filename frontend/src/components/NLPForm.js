// src/components/NLPForm.js

import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { generateText } from '../api';

const NLPForm = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await generateText(prompt);
      setResponse(res);
    } catch (err) {
      setError('Failed to generate text. This service is restricted in your country. Try using a VPN');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        AI Buddy
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your prompt"
          variant="outlined"
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate'}
        </Button>
      </form>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      {response && (
        <Typography variant="body1" mt={2}>
          {response}
        </Typography>
      )}
    </Box>
  );
};

export default NLPForm;
