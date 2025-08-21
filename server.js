const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Data file path
const dataFile = path.join(__dirname, 'golf-data.json');

// Get scores endpoint
app.get('/api/scores', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
            res.json(data);
        } else {
            res.json({
                scores: {},
                scrambleScores: {},
                awards: {},
                scrambleWinners: {},
                players: [] // Add this
            });
        }
    } catch (error) {
        console.error('Error reading scores:', error);
        res.json({});
    }
});

// Save scores endpoint
app.post('/api/scores', (req, res) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving scores:', error);
        res.status(500).json({ error: 'Failed to save' });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Golf app running on port ${PORT}`);
});
