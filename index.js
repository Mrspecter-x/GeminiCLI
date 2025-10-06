const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Merhaba Dünya!');
});

app.listen(port, () => {
  console.log(`Uygulama ${port} portunda çalışıyor.`);
});