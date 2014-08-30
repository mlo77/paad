module.exports = exports = function(app) {

    var
        swagger = require("swagger-node-express"),
        express = app.get("express");

    swagger.setAppHandler(app);

    // Configures the app's base path and api version.
    swagger.configureSwaggerPaths("", "api-docs", "");
    swagger.configure("http://localhost:"+ app.get("port"), "1.0.0");

    var docs_handler = express.static(__dirname + '/lib/swagger_ui/');
    app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
        if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
            res.writeHead(302, { 'Location' : req.url + '/' });
            res.end();
            return;
        }

        // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/docs'.length);
        return docs_handler(req, res, next);
    });

};
