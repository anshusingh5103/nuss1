
const express = require('express');
const app = express();
const PORT =process.env.PORT || 5500

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5500, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
