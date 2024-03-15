const express = require('express');
const mongoose = require('mongoose');
const router = require("./router.js");
require("dotenv").config();

const index = express(); 
index.use(express.json());


mongoose
  .connect(process.env.db_url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3003;

index.use('/', router); 

index.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});