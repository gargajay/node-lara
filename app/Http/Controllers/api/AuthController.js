const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('../../../../config/app');
const User = require('../../../Models/User');


// Sample users array (Replace with your own user data storage)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

class AuthController {
  constructor() {}

  login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    

    const { username, password } = req.body;

    


    // Find user by username
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Check password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Server error.' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Generate JWT
      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: 'Server error.' });
          }

          res.json({ token });
        }
      );
    });
  }

  validateLogin(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    next();
  }

  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Check if username already exists
    //   const existingUser = await User.findOne({ username });
    //   if (existingUser) {
    //     return res.status(400).json({ message: 'Username already exists.' });
    //   }

      // Generate password hash
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        username,
        password: hashedPassword
      });

      const savedUser = await newUser.save();

      // Generate JWT
      const payload = {
        user: {
          id: savedUser._id,
          username: savedUser.username
        }
      };

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Error during user signup:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  }

  validateSignup(req, res, next) {
    const { username, password } = req.body;

    console.log(req.body);

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    next();
  }
}

module.exports = AuthController;
