// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update if your Flask server runs on a different port

export const generateText = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { prompt });
    return response.data.response;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};


export const generateQuestions = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_questions`, { text });
    return response.data.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
};

export const improveSchedule = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/improve_schedule`, data);
      return response.data;
    } catch (error) {
      // Re-throw the error to be handled in the component
      throw error;
    }
  };
  

export const generateFlashcards = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_flashcards`, { text });
    return response.data.flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
};

export const summarize = async (prompt) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summarize`, { prompt });
    return response.data.response;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw error;
  }
};
