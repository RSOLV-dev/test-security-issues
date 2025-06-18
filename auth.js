// auth.js - Authentication module with intentional vulnerabilities for testing
const mysql = require('mysql');
const crypto = require('crypto');

function authenticateUser(username, password) {
    // SQL Injection vulnerability
    const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
    db.query(query, (err, results) => {
        if (results.length > 0) {
            // Weak crypto
            const token = crypto.createHash('md5').update(username + Date.now()).digest('hex');
            
            // XSS vulnerability
            document.getElementById('welcome').innerHTML = 'Welcome ' + username;
            
            return token;
        }
    });
}

// Command injection
const exec = require('child_process').exec;
function logUserActivity(userId, action) {
    exec('echo "User ' + userId + ' performed ' + action + '" >> /var/log/app.log');
}

// Path traversal
const fs = require('fs');
function getUserProfile(filename) {
    const profilePath = '/profiles/' + filename;
    return fs.readFileSync(profilePath, 'utf8');
}

module.exports = { authenticateUser, logUserActivity, getUserProfile };