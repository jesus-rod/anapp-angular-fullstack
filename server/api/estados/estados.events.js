/**
 * Estados model events
 */

'use strict';

import {EventEmitter} from 'events';
import Estados from './estados.model';
var EstadosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EstadosEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Estados.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EstadosEvents.emit(event + ':' + doc._id, doc);
    EstadosEvents.emit(event, doc);
  };
}

export default EstadosEvents;
