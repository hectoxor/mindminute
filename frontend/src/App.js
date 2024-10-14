// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TestComponent from './components/TestComponent';
import NLPForm from './components/NLPForm';
import PsychologyPage from './components/PsychologyPage';
import Flashcards from './components/Flashcards';
import ImproveSchedule from './components/ImproveSchedule';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
    return (
        <Router>
            {/* <AppBar position="static">
                <Toolbar>
                     <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        Study App
                    </Typography>
                    <Button color="inherit" component={Link} to="/NLPForm">
                        Therapist AI
                    </Button>
                    <Button color="inherit" component={Link} to="TestComponent">
                        Test
                    </Button>
                    <Button color="inherit" component={Link} to="/PsychologyPage">
                        Stress Relief
                    </Button>
                    <Button color="inherit" component={Link} to="/Flashcards">
                        Flashcards
                    </Button>
                    <Button color="inherit" component={Link} to="/ImproveSchedule">
                        Improve Schedule
                    </Button>
                </Toolbar>
            </AppBar> */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/NLPForm" element={<NLPForm />} />
                <Route path="/TestComponent" element={<TestComponent />} />
                <Route path="/PsychologyPage" element={<PsychologyPage />} />
                <Route path="/Flashcards" element={<Flashcards />} />
                <Route path="/ImproveSchedule" element={<ImproveSchedule />} />
                {/* Add more routes as needed */}
            </Routes>
           {/* Include Footer */}
        </Router>
    );
}

export default App;
