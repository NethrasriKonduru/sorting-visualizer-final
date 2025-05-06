const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// MongoDB Atlas connection string
const dbURI = 'mongodb+srv://kondurunethrasri2005:68Dz3yvM94J5ufog@cluster0.wxibnya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Define a simple schema and model for demonstration (user model example)
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

// Route to add a user to the database
app.post('/add-user', (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({
    name,
    email
  });

  newUser.save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Route to fetch all users
app.get('/users', (req, res) => {
  User.find()
    .then((users) => res.json(users)) // Returns all users
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
