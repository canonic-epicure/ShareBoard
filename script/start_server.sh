#!/bin/bash

syncler_server.js --preload=Task.ShareBoard.Model --backendClass=\"KiokuJS.Backend.CouchDB\" --backendParams={\"dbURL\":\"http://local:5984/shareboard\"}