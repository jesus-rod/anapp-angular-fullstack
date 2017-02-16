'use strict';

import mongoose from 'mongoose';

var EstadosSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  timestamps: true
});

export default mongoose.model('Estados', EstadosSchema);
