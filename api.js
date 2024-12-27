const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lalit@07',
    database: 'Equip9'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// POST: Create a new user
app.post('/register', async (req, res) => {
    const { firstname, lastname, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'CALL InsertUser(?, ?, ?, ?, ?)';
    db.query(query, [firstname, lastname, mobile, hashedPassword, 'system'], (err, results) => {
        if (err) throw err;
        res.send('User registered successfully');
    });
});

// GET: Retrieve user by mobile number
app.get('/user/:mobile', (req, res) => {
    const query = 'CALL GetUser(?)';
    db.query(query, [req.params.mobile], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// PUT: Update user details
app.put('/user/:id', async (req, res) => {
    const { firstname, lastname, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'CALL UpdateUser(?, ?, ?, ?, ?, ?)';
    db.query(query, [req.params.id, firstname, lastname, mobile, hashedPassword, 'system'], (err, results) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// DELETE: Delete a user
app.delete('/user/:id', (req, res) => {
    const query = 'CALL DeleteUser(?)';
    db.query(query, [req.params.id], (err, results) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

// Login and authentication
app.post('/login', (req, res) => {
    const { mobile, password } = req.body;
    const query = 'CALL GetUser(?)';
    db.query(query, [mobile], async (err, results) => {
        if (err) throw err;
        const user = results[0][0];
        if (user && await bcrypt.compare(password, user.password)) {
            res.send(`Good ${getGreeting()} Mr. ${user.first_name} ${user.last_name}`);
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Morning';
    if (hour < 18) return 'Afternoon';
    return 'Evening';
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
