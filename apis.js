module.exports = exports = function(app, context) {

    var
        swagger        = require('swagger-doc'),
        models         = require('./models.js');

    swagger.configure(app, {
        discoveryUrl: '/api/api-docs',
        version:      '0.1'
    });

    app.set("epoch", new Date().getTime());

    function dump_req(req, res) {
        console.log(req.method+' '+req.url+' '+JSON.stringify(req.body));
        res.send(501, { 'error': 'not implemented' });
    }

    function validateJson(body, res) {
        var json = null;
        if (!body)
            res.send(400, { 'error': 'missing body' });
        else if (!(json = JSON.parse(JSON.stringify(body))))
            res.send(400, { 'error': 'bad format' });
        if (json._id) {
            console.log('validateJson: discard _id field');
            delete json._id;
        }
        return json;
    }

    function validateParams(req, names, res) {
        for (i in names) {
            if (req.params[names[i]] === undefined) {
                res.send(400, { error: 'Missing '+names[i] });
                return false;
            }
        }
        return true;
    }

    // use functions below with 'function.bind(res)'
    function postResponse(err, item) {
        if (err) {
            this.send(500, { error: err });
        } else {
            this.send(200, item);
        }
    }
    function getOneResponse(err, item) {
        if (err) {
            this.send(500, { error: err });
        } else if (!item) {
            this.send(404, null);
        } else {
            this.send(200, item);
        }
    }
    function getAllResponse(err, items) {
        if (err) {
            this.send(500, { error: err });
        } else {
            this.send(200, { count: items.length, items: items });
        }
    }
    function deleteResponse(err, item) {
        if (err) {
            this.send(500, { status: 'error', error: err });
        } else if (item === null) {
            this.send(404, { status: 'error', error: 'not found' });
        } else {
            this.send(200, { status: 'ok', item: item });
        }
    }

    var apis = {
        products: [
            {
                method: 'get', path: '/products',
                returns: 'ProductList',
                desc: 'Get the product list',
                func: function(req, res) {
                    //context.widgets.getAll(getAllResponse.bind(res));
                }
            }, {
                method: 'post', path: '/products',
                returns: 'Product',
                params: [models.Product],
                desc: 'Add a product',
                func: function(req, res) {
                    // var json = validateJson(req.body, res);
                    // if (json)
                    //     context.widgets.add(json, postResponse.bind(res));
                }
            }, {
                method: 'get', path: '/products/:productId',
                returns: 'Product',
                params: [models.ProductID],
                desc: 'Get a Product',
                func: function(req, res) {
                    // if (validateParams(req, ['widgetId'], res))
                    //     context.widgets.getById(req.params.widgetId, getOneResponse.bind(res));
                }
            }, {
                method: 'put', path: '/products/:productId',
                params: [models.ProductID, models.Product],
                returns: 'Product',
                desc: 'Update a product',
                func: function(req, res) {
                    // if (validateParams(req, ['widgetId'], res)) {
                    //     var json = validateJson(req.body, res);
                    //     if (json)
                    //         context.widgets.update(req.params.widgetId, req.body, getOneResponse.bind(res));
                    // }
                }
            }, {
                method: 'delete', path: '/products/:productId',
                params: [models.ProductID],
                returns: 'Status',
                desc: 'Delete a product',
                func: function(req, res) {
                    // if (validateParams(req, ['widgetId'], res))
                    //     context.widgets.remove(req.params.widgetId, deleteResponse.bind(res));
                }
            }, {
                method: 'post', path: '/admin/products',
                params: [models.ProductList],
                returns: 'ProductList',
                desc: 'Initialize the product list',
                func: function(req, res) {
                    // var json = validateJson(req.body, res);
                    // if (json)
                    //     context.widgets.populate(json, getAllResponse.bind(res));
                }
            }, {
                method: 'delete', path: '/admin/products',
                returns: 'Status',
                desc: 'Remove the products list',
                func: function(req, res) {
                    // context.widgets.purge(deleteResponse.bind(res));
                }
            }
        ]
    };

    for (category in apis) {
        var doc = swagger.createResource('/api-docs/'+category, { models: models });
        apis[category].forEach(function(cmd) {
            // add API function
            app[cmd.method](cmd.path, cmd.func);
            // add Swagger doc
            var docpath = cmd.path.replace(/:([^/]+)/g, '{$1}'); // '/:xxx' => '/{xxx}'
            doc[cmd.method](docpath, cmd.desc, {
                // method:'X' and path:'/Y/:Z' => nickname:'X_Y_byZ'
                nickname: cmd.method+cmd.path.replace(/\//g, '_').replace(/:/g, 'by'),
                responseClass: cmd.returns,
                parameters: cmd.params,
                notes: cmd.notes
            });
        });
    }

    return app;

};
