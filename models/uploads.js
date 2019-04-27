var mongoose = require('mongoose');
var UploadSchema = new mongoose.Schema({
  title: String,
  game: String,
  type: String,
  partySize: String,
  lvl: String,
  desc: String,
  fileUrl: String,
  imgUrl: String,
  upvotes: {
    type: Number,
    default: 0
  }
});

UploadSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};

UploadSchema.methods.downvote = function (cb) {
  if (this.upvotes > 0) {
    this.upvotes -= 1;
  }
  this.save(cb);
};

mongoose.model('Upload', UploadSchema);