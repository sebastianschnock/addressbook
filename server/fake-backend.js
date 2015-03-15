'use strict';

module.exports = {

    getRouterFor: getRouterFor,
    getById: getById,
    indexOf: indexOf
};

// requires
var db = require('../contacts.js').db;
var fs = require('fs');

// change to 'false' to make the database read-only
var backupsEnabled = true;

var idCounters = {
    contacts: getHighestId('contacts')+1,
};

function getHighestId(type) {
    var models = db[type];
    var highestId = 1;
    for(var i=0; i<models.length; i++) {
        if(models[i].id > highestId) highestId = models[i].id;
    }
    return highestId;
}

function getNewIdFor(type) {
    return idCounters[type]++;
}



// -----------------------------------------------------------------------------
// Generic router

function getRouterFor(typeSingle, typePlural, deleteHandler) {
    var express = require('express');
    var router = express.Router();
 
    router.route('/')
        .all(function(req, res, next) {
            next();
        })
        .get(function(req, res) {
            var result = {};
            result[typePlural] = db[typePlural];
            res.send(result);
        })
        .post(function(req, res, next) {
            // return format expected by ember:
            //     { <type>: {
            //             id: <id>
            //         }
            //     }
            //     eg: { item: { id: 1 } }
            var newEntry = add(req.body[typeSingle], typePlural);
            var result = {};
            result[typeSingle] = { id: newEntry.id };
            backupDB();
            res.send(result);
        });    
 
    router.route('/:id')
        .all(function(req, res, next) {
            next();
        })    
        .get(function(req, res) {
            var result = {};
            try {
                result[typeSingle] = getById(req.params.id, typePlural);
                res.send(result);
            } catch(e) {
                res.sendStatus(404);
            }
        })
        .put(function(req, res, next) {
            var result = {};
            result[typeSingle] = update(req.params.id, typePlural, req.body[typeSingle]);
            backupDB();
            res.send(result);
        })
        .delete(function(req, res) {
            if(typeof deleteHandler !== 'undefined') {
                deleteHandler(req.params.id, db);
            } else {
                deleteEntry(req.params.id, typePlural);
            }
            backupDB();
            // res.send({});
            res.json(true);
        });        
    return router;
}

// -----------------------------------------------------------------------------
// DB operations

function indexOf(id, type) {
    var models = db[type];
    for(var i=0; i<models.length; i++){
        if(models[i].id == id) return i;
    }
    throw 'could not find ' +type +' with id ' +id;
}

function getById(id, type) {
    var models = db[type];
    for(var i=0; i<models.length; i++){
        if(models[i].id == id) return models[i];
    }
    throw 'could not get ' +type +' with id ' +id;    
}

function update(id, type, newModel) {
    var model = getById(id, type);
    for(var prop in newModel) {
        model[prop] = newModel[prop];
    }
    newModel.id = model.id;
    return newModel;
}

function deleteEntry(id, type) {
    db[type].splice(indexOf(id, type), 1);
}

function add(data, type) {
    var newEntry = {};
    newEntry.id = getNewIdFor(type);
    for(var prop in data) {
        newEntry[prop] = data[prop];
    }
    db[type].push(newEntry);
    return newEntry;
}

function backupDB() {
    // http://nodejs.org/api/fs.html
    if(backupsEnabled) {
        var path = 'contacts.js';
        fs.renameSync(path, path +'.bak');
        fs.writeFileSync(path, 'module.exports = { db:');
        fs.appendFileSync(path, JSON.stringify(db));
        fs.appendFileSync(path, '};');
    }
}