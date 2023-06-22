const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../app/Http/Controllers/api/AuthController');
const authMiddleware = require('../app/Http/Middleware/auth');
const upload = require('multer')();


const router = express.Router();
const authController = new AuthController();


router.get('/home', (req, res) => {
  res.json({ message: 'Protected route accessed.' });
});

// router.post('/home2', upload.single('password'), (req, res) => {
//   console.log(req.password);
//   res.json({ message: 'eee' });
// });

router.post('/upload', upload.single('image'), (req, res) => {
  console.log('Image data:', req.file);
  res.json({ message: 'Image uploaded successfully' });
});


router.post(
  '/login',
  authController.login.bind(authController)
);

router.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.')
  ],
  authController.validateSignup.bind(authController),
  authController.signup.bind(authController)
);

// Protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed.' });
});

module.exports = router;
