const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    company: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const stagesSchama = new Schema(
  {
    name: {
      type: String,
    },
    board: {
      type: mongoose.Types.ObjectId,
      ref: 'board',
    },
    jobs: [jobSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('stage', stagesSchama);
