'use strict';

const async = require('async');
const columbianBeansInterface = require('./../utils/columbian-beans-interface');
const config = require('./../utils/config');
const _ = require('underscore');


module.exports = function(req, res, callback) {
    var profiles = [];
    var hashTagProfiles = [];

    var getProfiles = function(callback) {
        columbianBeansInterface(
            config.columbianBeans.getPath,
            config.columbianBeans.collections.profiles,
            null,
            function(error, response) {
                if (error) {
                    callback(error);
                    return;
                }

                if (!_.has(response, 'payload')) {
                    callback(new Error('No payload in col-beans response'));
                    return;
                }

                console.log('got profiles:', response.payload);

                profiles = response.payload;
                callback();
            }
        );
    };

    var getHashTagProfiles = function(callback) {
        columbianBeansInterface(
            config.columbianBeans.getPath,
            config.columbianBeans.collections.hashTagProfiles,
            null,
            function(error, response) {
                if (error) {
                    callback(error);
                    return;
                }

                if (!_.has(response, 'payload')) {
                    callback(new Error('No payload in col-beans response'));
                    return;
                }

                console.log('hash tag profiles:', response.payload);

                hashTagProfiles = response.payload;
                callback();
            }
        );
    };

    console.log('async series start');

    async.series([
        getProfiles,
        getHashTagProfiles
    ], function(error) {
        if (error) {
            callback(error);
            return;
        }

        console.log('in aysnc callback profiles:', profiles, 'hash tag profiles', hashTagProfiles);
        callback(error, profiles, hashTagProfiles);
    });
};
