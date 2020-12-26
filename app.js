const express = require('express');

const cors = require('cors');

const { json, urlencoded } = require('body-parser');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoutes');

const articlesRoute = require('./routes/articlesRoute');

const app = express();

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', articlesRoute);

app.get('/', (req, res) => res.status(200).json({ message: 'welcome to my api' }));

app.all('*', (req, res) => res.status(404).json({
  message: 'route not found'
}));

app.listen(5001, () => {
  console.log('server started...');
});
