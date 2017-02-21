'use strict';

import mongoose from 'mongoose';

var ParroquiaSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  active: Boolean
}, {
  timestamps: true
});

export default mongoose.model('Parroquia', ParroquiaSchema);
