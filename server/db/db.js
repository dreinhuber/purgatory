const mongoose = require('mongoose');
const { ATLASSPWD } = require('../../secrets');

const { Schema } = mongoose;

mongoose.connect(`mongodb+srv://Cluster08306:${ATLASSPWD}@cluster08306.bimlgdo.mongodb.net/?retryWrites=true&w=majority`, {
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
