const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '_book')));
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'book', 'index.html'))
);

app.listen(9999, () => console.log('React Tutorial Gitbook listens on 9999.'));
