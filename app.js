require('dotenv').config();
const express = require('express');
const db = require('./config/database');
const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));

db.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
