const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/parks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const issueSchema = new Schema({
  marker: String,
  summary: String,
  description: String,
  date: { type: Date, default: Date.now },
  photos: Array,
});

const trailSchema = new Schema({
  name: { type: String, index: true },
  marker: String,
  lastMarker: Number,
  park: String,
  issues: [issueSchema],
});

const parkSchema = new Schema({
  parkName: { type: String, index: true },
  trails: [trailSchema],
});

module.exports = {
  Issue: mongoose.model('Issue', issueSchema),
  Trail: mongoose.model('Trail', trailSchema),
  Park: mongoose.model('Park', parkSchema),
};
