const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' })); // Increase limit for large data
app.use(express.static(__dirname));

// Use persistent storage path
const dataDir = '/app/data';  // This matches the Mount Path in Coolify
const dataFile = path.join(dataDir, 'golf-data.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get all scores and data
app.get('/api/scores', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            console.log('Data loaded from:', dataFile);
            res.json(data);
        } else {
            // Return empty structure that matches frontend expectations
            const emptyData = {
                yearlyData: {},
                players: [],
                playedCourses: [],
                whiskyCollection: [],
                useSlope: true,
                scrambleFormula: 'standard',
                currentYear: 2025
            };
            console.log('No data file found, returning empty structure');
            res.json(emptyData);
        }
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// API endpoint to save all data
app.post('/api/scores', (req, res) => {
    try {
        // Save the entire request body which should contain all frontend data
        const data = {
            yearlyData: req.body.yearlyData || {},
            players: req.body.players || [],
            playedCourses: req.body.playedCourses || [],
            whiskyCollection: req.body.whiskyCollection || [],
            courses: req.body.courses || {},
            schedule: req.body.schedule || [],
            useSlope: req.body.useSlope !== undefined ? req.body.useSlope : true,
            scrambleFormula: req.body.scrambleFormula || 'standard',
            currentYear: req.body.currentYear || 2025,
            timestamp: req.body.timestamp || new Date().toISOString(),
            
            // Legacy support - these might be sent separately
            scores: req.body.scores || {},
            scrambleScores: req.body.scrambleScores || {},
            awards: req.body.awards || {},
            flightTimes: req.body.flightTimes || {}
        };
        
        // Write data to file with pretty formatting
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        console.log('Data saved successfully to:', dataFile);
        console.log('Data size:', JSON.stringify(data).length, 'characters');
        res.json({ success: true, timestamp: data.timestamp });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data', details: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        dataFileExists: fs.existsSync(dataFile),
        dataDir: dataDir,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Golf Scotland server running on port ${PORT}`);
    console.log(`Data directory: ${dataDir}`);
    console.log(`Data file: ${dataFile}`);
    console.log(`Data file exists: ${fs.existsSync(dataFile)}`);
});
