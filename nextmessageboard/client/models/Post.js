import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  comAuth: String,
  date: String,
  comVotedUsers: [
    {
      type: String,
    },
  ],
  _authId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comVotes: {
    type: Number,
    default: 0,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

module.exports = mongoose.model('Post', postSchema);
