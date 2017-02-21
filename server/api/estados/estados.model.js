'use strict';

import mongoose from 'mongoose';



var EstadosSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  active: Boolean,
  parroquiasOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parroquia'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Estados', EstadosSchema);
