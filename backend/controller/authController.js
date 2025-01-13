const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    User.findByEmail(email, async (err, existingUser) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        User.create({ username, email, password: hashedPassword }, (err, newUser) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json(newUser);
        });
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        User.findByEmail(email, async (err, existingUser) => {
        //    return res.status(200).json(process.env.JWT_SECRET);
            if (err || !existingUser || !(await bcrypt.compare(password, existingUser.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: existingUser.id, email:existingUser.email }, process.env.JWT_SECRET);
            res.json({ token });
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
