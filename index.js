const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => res.json({ message: 'hey' }));

app.listen(5001, () => {
  console.log('server started...');
});
