var express = require('express');
var axios = require('axios');
var async = require('async');
var router = express.Router();

const getIpAddress = function() {
    return axios.get('https://api.ipify.org?format=json');
}

router.get('/', function(req, res, next) {
    async.parallel([
        function(callback) {
            getIpAddress().then(function(data) {
                callback(null, 'Get IP 1 is OK. IP: ' + data.data.ip);
            });
        },
        function(callback) {
            getIpAddress().then(function(data) {
                callback(null, 'Get IP 2 is OK. IP: ' + data.data.ip);
            });
        },
        function(callback) {
            getIpAddress().then(function(data) {
                callback(null, 'Get IP 3 is OK. IP: ' + data.data.ip)
            });
        }
    ], function(err, results) {
        var data = [];
        results.forEach(function(item) {
            data.push(item);
        });
        res.locals.data = data;
        next();
    });
});

module.exports = router;
