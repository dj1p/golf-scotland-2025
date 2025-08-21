const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

const dataFile = 'golf-data.json';

// Get scores
app.get('/api/scores', (req, res) => {
    if (fs.existsSync(dataFile)) {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        res.json(data);
    } else {
        res.json({});
    }
});

// Save scores
app.post('/api/scores', (req, res) => {
    fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
