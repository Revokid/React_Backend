require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index.js');
const adminRouter = require('./routes/admin.js');
const apiRouter = require('./routes/api.js');


app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


app.use(cors());

