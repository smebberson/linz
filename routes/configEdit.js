'use strict';

const linz = require('../');

/* GET /admin/config/:config/overview */
var route = function (req, res, next) {

    linz.api.model.generateForm({
        form: req.linz.model.linz.formtools.form,
        record: req.linz.record,
        schema: req.linz.model.schema,
        type: 'edit',
    })
        .then(editForm => Promise.all([
            linz.api.views.getScripts(req, res, [
                {
                    src: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.min.js',
                    integrity: 'sha256-0JaDbGZRXlzkFbV8Xi8ZhH/zZ6QQM0Y3dCkYZ7JYq34=',
                    crossorigin: 'anonymous',
                },
                {
                    src: `${linz.get('admin path')}/public/js/jquery.binddata.js`,
                },
                {
                    src: `${linz.get('admin path')}/public/js/documentarray.js`,
                },
                {
                    src: `${linz.get('admin path')}/public/js/model/edit.js`,
                },
            ]),
            linz.api.views.getStyles(req, res),
        ]))
        .then(([scripts, styles]) => res.render(linz.api.views.viewPath('configEdit.jade'), {
            actionUrl: linz.api.url.getAdminLink(req.linz.config, 'save', req.linz.record._id),
            cancelUrl: linz.api.url.getAdminLink(req.linz.config, 'list'),
            form: editForm.render(),
            record: req.linz.record,
            scripts,
            styles,
        }))
        .catch(next);

};

module.exports = route;
