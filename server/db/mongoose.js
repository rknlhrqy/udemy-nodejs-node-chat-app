const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
/*
mongoose.connect('mongodb://localhost:27017/Chat-Server', { useNewUrlParser: true });
*/
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const MessageSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = {
  Message,
};
