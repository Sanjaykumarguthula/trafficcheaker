const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/track') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            fs.appendFile('traffic.log', body + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Error saving tracking data');
                } else {
                    res.statusCode = 200;
                    res.end('Tracking data saved');
                }
            });
        });
    } else if (req.method === 'GET' && req.url === '/') {
        const analyzeTraffic = require('./analysis');
        analyzeTraffic((err, stats) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error analyzing traffic data');
                return;
            }
            fs.readFile('index.html', 'utf8', (err, html) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error reading index.html');
                    return;
                }
                const renderedHtml = html.replace('{{visits}}', stats.visits).replace('{{uniqueVisitors}}', stats.uniqueVisitors);
                res.setHeader('Content-Type', 'text/html');
                res.end(renderedHtml);
            });
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
