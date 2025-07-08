require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');
const socket = require('./socket');
const cors = require('cors');
const db = require('./config/database');
const app = express();
const commentRoutes = require('./routes/comment.route');
const http = require('http');
const postRoutes = require('./routes/post.routes');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*', 
  },
});


app.use(cors());
app.set('io', io);
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/posts', require('./routes/post.routes'));
app.use('/api', commentRoutes);
app.use('/api/posts', postRoutes);

db.sync().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});

