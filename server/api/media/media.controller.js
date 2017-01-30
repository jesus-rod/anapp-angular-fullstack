/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/media              ->  index
 * POST    /api/media              ->  create
 * GET     /api/media/:id          ->  show
 * PUT     /api/media/:id          ->  upsert
 * PATCH   /api/media/:id          ->  patch
 * DELETE  /api/media/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Media from './media.model';
import fs from 'fs';

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

// Gets a list of Medias
export function index(req, res) {
  let path = req.query.path;
  var img = null;

  try {
    console.log("path es", path);
    img = fs.readFileSync(path);
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  }catch (ex) {
    console.log("error", ex);
    // en caso de que ninguna imagen fue encontrada
    // devuelvo una imagen por defecto
    img = fs.readFileSync('./server/images/default-no-image.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  }



}

// Gets a single Media from the DB
export function show(req, res) {
  return Media.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Media in the DB
export function upload(req, res) {
  console.log('file', req.files);
  return res.status(200).json({path: req.files.file.path});
}

// Upserts the given Media in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Media.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Media in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Media.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Media from the DB
export function destroy(req, res) {
  return Media.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
