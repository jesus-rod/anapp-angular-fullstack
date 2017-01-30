'use strict';

import mongoose from 'mongoose';

var MediaSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Media', MediaSchema);
