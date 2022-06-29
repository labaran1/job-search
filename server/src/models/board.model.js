const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  stage: {
    type: mongoose.Types.ObjectId,
    ref: 'stages',
  },
});

const stagesSchama = new Schema(
  {
    name: {
      type: String,
    },
    jobs: [jobSchema],
  },
  { timestamps: true }
);

const boardSchema = new Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    stages: [stagesSchama],
  },
  { timestamps: true }
);

module.exports = mongoose.model('board', boardSchema);
