const express = require('express');

const cors = require('cors');

const { json, urlencoded } = require('body-parser');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoutes');

const articlesRoute = require('./routes/articlesRoute');

const gifRoute = require('./routes/gifRoute');

const app = express();

app.use(cors());

app.use(express.static('public'));
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', articlesRoute);
app.use('/api/v1', gifRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'welcome to my api' }));

app.all('*', (req, res) => res.status(404).json({
  message: 'route not found'
}));

app.listen(5001, () => {
  console.log('server started...');
});
