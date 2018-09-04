'use strict';

const linz = require('../linz');
const emailSchema = require('../schemas/emailSchema');
const docSchema = require('../schemas/docSchema');

const mtUserSchema = new linz.mongoose.Schema({
    alternativeEmails: [emailSchema],
    age: Number,
    bAdmin: {
        default: false,
        type: Boolean,
    },
    email: String,
    name:  String,
    org: {
        ref: 'mtOrg',
        type: linz.mongoose.Schema.Types.ObjectId,
    },
    password: String,
    username: String,
});

// add the formtools plugin
mtUserSchema.plugin(linz.formtools.plugins.document, {
    form: {
        name: {
            fieldset: 'Details',
            helpText: 'The users full name.',
        },
        email: {
            fieldset: 'Details',
        },
        alternativeEmails: {
            fieldset: 'Details',
        },
        org: {
            fieldset: 'Details',
        },
        age: {
            fieldset: 'Details',
        },
        username: {
            fieldset: 'Access',
        },
        password: {
            fieldset: 'Access',
            widget: linz.formtools.widgets.password(),
        },
        bAdmin: {
            fieldset: 'Access',
            helpText: 'This controls if the user has access to admin.',
        },
    },
    labels: {
        bAdmin: 'Has admin access?',
    },
    list: {
        fields: {
            name: true,
            username: true,
            email: true,
            bAdmin: true,
            org: { renderer: linz.formtools.cellRenderers.defaultRenderer },
        },
        recordActions: [
            {
                action: 'edit-custom',
                disabled: false,
                label: 'Customised edit form',
            },
        ],
    },
    model: {
        description: 'Manage users.',
        label: 'User',
        title: 'username',
    },
    overview: {
        summary: {
            fields: {
                name: {
                    renderer: linz.formtools.cellRenderers.defaultRenderer
                },
                email: {
                    renderer: linz.formtools.cellRenderers.defaultRenderer
                },
            },
        },
    },
});

mtUserSchema.virtual('hasAdminAccess').get(function () {
    return this.bAdmin === true;
});

mtUserSchema.methods.verifyPassword = function (candidatePassword, callback) {
    return callback(null, this.password === candidatePassword);
}

module.exports = linz.mongoose.model('mtUser', mtUserSchema);
