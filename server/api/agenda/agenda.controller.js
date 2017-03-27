/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agendas              ->  index
 * POST    /api/agendas              ->  create
 * GET     /api/agendas/:id          ->  show
 * PUT     /api/agendas/:id          ->  upsert
 * PATCH   /api/agendas/:id          ->  patch
 * DELETE  /api/agendas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Agenda from './agenda.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Agendas
export function index(req, res) {
  return Agenda.find()
  .populate({
      path: 'postedBy',
      populate: [{
        path: 'estado',
        model: 'Estados',
        populate:[{
          path: 'parroquiasOwned',
          model: 'Parroquia'
        }]

      },
      {
        path: 'parroquia',
        model: 'Parroquia'
      }]
    })
    .sort({createdAt: 'descending'})
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Agenda from the DB
export function show(req, res) {
  return Agenda.findById(req.params.id)
  .populate({
      path: 'postedBy',
      populate: [{
        path: 'estado',
        model: 'Estados',
        populate:[{
          path: 'parroquiasOwned',
          model: 'Parroquia'
        }]

      },
      {
        path: 'parroquia',
        model: 'Parroquia'
      }]
    })
    .sort({createdAt: 'descending'})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Agenda in the DB
export function create(req, res) {
  return Agenda.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Agenda in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Agenda.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Agenda in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Agenda.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Agenda from the DB
export function destroy(req, res) {
  return Agenda.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
