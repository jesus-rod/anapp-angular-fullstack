/**
 * Parroquia model events
 */

'use strict';

import {EventEmitter} from 'events';
import Parroquia from './parroquia.model';
var ParroquiaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ParroquiaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Parroquia.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ParroquiaEvents.emit(event + ':' + doc._id, doc);
    ParroquiaEvents.emit(event, doc);
  };
}

export default ParroquiaEvents;
