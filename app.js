const express = require('express');

const cors = require('cors');

const expressFileUpload = require('express-fileupload');

const cloudinary = require('cloudinary').v2;

require('dotenv').config();

const { json, urlencoded } = require('body-parser');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoutes');

const articlesRoute = require('./routes/postsRoute');

const gifRoute = require('./routes/gifRoute');

const uploadRoute = require('./routes/uploadRoute');

const commentsRoute = require('./routes/commentsRoute');

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

app.use(express.static('public'));
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(expressFileUpload({ useTempFiles: true }));
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', articlesRoute);
app.use('/api/v1', gifRoute);
app.use('/api/v1', uploadRoute);
app.use('/api/v1', commentsRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'welcome to my api' }));

app.all('*', (req, res) => res.status(404).json({
  message: 'route not found'
}));

app.listen(5001, () => {
  console.log('server started...');
});
