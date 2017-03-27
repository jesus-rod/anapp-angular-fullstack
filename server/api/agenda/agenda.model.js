'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './agenda.events';

var AgendaSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  active: Boolean,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

registerEvents(AgendaSchema);
export default mongoose.model('Agenda', AgendaSchema);
