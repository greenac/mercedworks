'use strict';

var path = require('path');

var port = process.env.MERCED_WORKS_PORT || '3333';
var appName = 'mercedworks';
var mode = !!process.env.MERCED_WORKS_MODE ? process.env.MERCED_WORKS_MODE : 'production';
var redirectUri = mode === 'production' ?
    'ec2-54-200-241-144.us-west-2.compute.amazonaws.com/got-instagram-token' :
    'http://localhost:3333/got-instagram-token';
var columbianBeanHost = !!process.env.COLUMBIAN_BEAN_HOST ?
    process.env.COLUMBIAN_BEAN_HOST : 'http://ec2-54-201-78-188.us-west-2.compute.amazonaws.com';
// TODO all params that can be moved to process.env should be moved

module.exports = {
    appName: appName,
    port: port,
    filePaths: {
        logFilePath: path.join('/var/log', appName),
        instagramParamsPath: path.join(__dirname, '../files/instagram-params.json'),
        instagramProfileMapPath: path.join(__dirname, '../files/instagram-profile-map.json')
    },
    columbianBeans: {
        database: 'mercedworks',
        host: columbianBeanHost,
        port: process.env.COLUMBIAN_BEANS_PORT || '80',
        postPath: 'save-records/',
        getPath: 'all-records/',
        collections: {
            profiles: 'profiles',
            parameters: 'parameters'
        },
        hostAndPort: function () {
            return this.host + ':' + this.port;
        },
        getUri: function () {
            return this.hostAndPort() + '/' + this.getPath;
        },
        postUri: function () {
            return this.hostAndPort() + '/' + this.postPath;
        }
    },
    apiInfo: {
        instagram: {
            clientId: process.env.INSTAGRAM_CLIENT_ID || '4265370676f743eabb781e15f2228ed5',
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || 'f9cf460d3567413f81082a1af2f0aa8a',
            redirectUri: redirectUri,
            baseUri: 'api.instagram.com',
            accessTokenPath: '/oauth/access_token',
            recentMediaPath: '/v1/users/self/media/recent',
            port: 443
        }
    }
};