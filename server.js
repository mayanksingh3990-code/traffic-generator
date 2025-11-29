const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const CONFIG_FILE = path.join(__dirname, 'config.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let currentJob = {
    targetUrl: 'https://example.com',
    duration: 30000, // 30 seconds
    interval: 5000,  // 5 seconds
    region: null,
    concurrency: 5 // Default to 5 concurrent bots
};

// Load config from file if exists
if (fs.existsSync(CONFIG_FILE)) {
    try {
        const savedConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
        currentJob = { ...currentJob, ...savedConfig };
        console.log('[*] Loaded config from file:', currentJob);
    } catch (err) {
        console.error('[-] Failed to load config file:', err.message);
    }
}

// Store stats in memory
let stats = {
    totalVisits: 0,
    visitsByUrl: {},
    startTime: Date.now()
};

// API to get the current job
app.get('/api/job', (req, res) => {
    res.json(currentJob);
});

// API to update the job
app.post('/api/job', (req, res) => {
    const { targetUrl, duration, interval, region, concurrency } = req.body;
    if (targetUrl) {
        currentJob = {
            targetUrl,
            duration: parseInt(duration) || 60000,
            interval: parseInt(interval) || 5000,
            region: region || null,
            concurrency: parseInt(concurrency) || 5
        };
        
        // Save to file
        try {
            fs.writeFileSync(CONFIG_FILE, JSON.stringify(currentJob, null, 2));
            console.log('[*] Job updated and saved:', currentJob);
        } catch (err) {
            console.error('[-] Failed to save config file:', err.message);
        }

        res.json({ message: 'Job updated successfully', job: currentJob });
    } else {
        res.status(400).json({ error: 'Target URL is required' });
    }
});

// API to report a successful visit
app.post('/api/report-visit', (req, res) => {
    const { url } = req.body;
    if (url) {
        stats.totalVisits++;
        if (!stats.visitsByUrl[url]) {
            stats.visitsByUrl[url] = 0;
        }
        stats.visitsByUrl[url]++;
        console.log(`[+] Visit reported for ${url}. Total: ${stats.totalVisits}`);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'URL is required' });
    }
});

// API to get stats
app.get('/api/stats', (req, res) => {
    const uptime = Date.now() - stats.startTime;
    res.json({
        ...stats,
        uptime,
        uptimeFormatted: formatUptime(uptime)
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        uptime: Date.now() - stats.startTime,
        totalVisits: stats.totalVisits
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[+] C&C Server running on port ${PORT}`);
    console.log(`[+] Server URL: http://0.0.0.0:${PORT}`);
    console.log(`[+] Health check: http://0.0.0.0:${PORT}/health`);
});