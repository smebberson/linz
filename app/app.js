'use strict';

const { EventEmitter } = require('events');
const editCustomRoute = require('./routes/edit-custom');
const error = require('./routes/error');
const errorJson = require('./routes/error-json');
const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const linz = require('linz');
const resetData = require('./routes/reset-data');
const scripts = require('./lib/scripts');
const session = require('./lib/session');
const styles = require('./lib/styles');

const port = 8888;

class App extends EventEmitter {

    /**
     * App contructor.
     * @param {Object} options Linz options.
     * @return {Void} Starts the app.
     */
    constructor(options) {

        super();

        const app = express();

        this.app = app;

        linz.init({
            'express': app,
            'options': {
                'mongo': 'mongodb://mongodb-dev:27017/lmt',
                'session middleware': session,
                'user model': 'mtUser',
                'scripts': scripts,
                'styles': styles,
            },
        });

        linz.on('initialised', () => {

            linz.app.engine('handlebars', handlebars.create().engine);
            linz.app.set('view engine', 'handlebars');

            linz.app.get('/', (req, res) => res.redirect(linz.get('login path')));
            linz.app.get('/reset', resetData);
            linz.app.get('/error', error);
            linz.app.get('/error-json', errorJson);

            // Custom form example.
            linz.app.get(`${linz.get('admin path')}/model/mtUser/:id/action/edit-custom`, editCustomRoute.get);
            linz.app.post(`${linz.get('admin path')}/model/mtUser/:id/action/edit-custom`, editCustomRoute.post);

            linz.app.use(linz.middleware.error);

            this.emit('ready');

        });

    }

    /**
     * Bootstrap the server.
     * @return {Void} Starts the server.
     */
    startServer() {

        console.log('Starting the HTTP server.');

        http.createServer(this.app)
            .listen(port, () => console.log(`Linz started and running on port ${port}`));

    }

}

module.exports = App;
