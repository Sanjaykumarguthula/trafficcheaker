const fs = require('fs');

function analyzeTraffic(callback) {
    fs.readFile('traffic.log', 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }

        const lines = data.trim().split('\n');
        const visits = lines.length;
        const uniqueVisitors = new Set(lines.map(line => JSON.parse(line).userId)).size;

        callback(null, { visits, uniqueVisitors });
    });
}

module.exports = analyzeTraffic;
