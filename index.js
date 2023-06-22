const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());





// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });
// Connect to MongoDB
app.use(express.json());
const database = connectDB();





  // Routes
app.use('/api', apiRoutes);


const port = 3000; // Set the port number

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }); 