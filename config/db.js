const mongoose = require('mongoose');
const config = require('../config/app');


const connectDB =  () => {
    try {
        console.log(1);
      mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

  
  
  module.exports = connectDB;
