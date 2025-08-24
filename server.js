const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const dataFile = path.join(__dirname, 'golf-data.json');

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get all scores and data
app.get('/api/scores', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            res.json(data);
        } else {
            // Return empty structure if file doesn't exist
            res.json({
                scores: {},
                scrambleScores: {},
                awards: {},
                scrambleWinners: {},
                players: [],
                schedule: [],
                playedCourses: [],
                whiskyCollection: []
            });
        }
    } catch (error) {
        console.error('Error reading scores:', error);
        res.json({
            scores: {},
            scrambleScores: {},
            awards: {},
            scrambleWinners: {},
            players: [],
            schedule: [],
            playedCourses: [],
            whiskyCollection: []
        });
    }
});

// API endpoint to save all data
app.post('/api/scores', (req, res) => {
    try {
        const data = {
            scores: req.body.scores || {},
            scrambleScores: req.body.scrambleScores || {},
            awards: req.body.awards || {},
            scrambleWinners: req.body.scrambleWinners || {},
            players: req.body.players || [],
            schedule: req.body.schedule || [],
            playedCourses: req.body.playedCourses || [],
            whiskyCollection: req.body.whiskyCollection || [],
            scrambleHandicapPercentage: req.body.scrambleHandicapPercentage || 25
        };
        
        // Write data to file with pretty formatting
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving scores:', error);
        res.status(500).json({ error: 'Failed to save scores' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access the app at http://localhost:${PORT}`);
});
