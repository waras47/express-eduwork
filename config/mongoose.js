const mongoose = require('mongoose');

// mongoose.connect ('mongodb://eduwork1:eduwork@localhost:27017/eduwork-moongose?authSource=admin');
const database = process.env.MONGO_URI || 'mongodb://eduwork1:eduwork@localhost:27017/eduwork-moongose?authSource=admin';
mongoose.connect(database, {
    useUnifiedTopology : true,
    useNewUrlParser : true
});
const db= mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Server berhasil terhubung'));