---
id: form-dsl
title: Form DSL
sidebar_label: Form DSL
---

The Models form DSL is used to customise the create and edit forms that are generated for each model. The form DSL has quite a few options as the model create and edit forms are highly customizable.

The form DSL is used to construct create and edit form controls (for example checkboxes, or text inputs) for a model record. Each key in the `form` object represents one of your model's fields.

The type of form control used for each field can be defined explicitly, or determined by Linz (the default) based on the fields data type, as specificed when defining the field with Mongoose.

Each form control comes in the form of a widget, and can be explicitly altered by providing a different Linz widget, or creating your own widget.

`form` should be an object. It should contain a key, labelled with the name of the model field you're providing information for.

For example, if you had a model with the fields `name` and `email` your `form` DSL might look like:

```javascript
form: {
    name: {
        // configure the edit widget for the name field
    },
    email: {
        // configure the edit widget for the name field
    }
}
```

Each field object can contain the following top-level keys:

-   `label`
-   `placeholder`
-   `helpText`
-   `type`
-   `default`
-   `list`
-   `visible`
-   `disabled`
-   `fieldset`
-   `widget`
-   `required`
-   `query`
-   `transform`
-   `transpose`

These allow you to describe how the model create and edit forms should function.

## Specialized contexts

There are two specialized contexts in which the `form` DSL operates:

-   When creating a model
-   When editing a model

From time to time, you'll want to have different settings for one field, based on the context. Linz supports this through use of `create` and `edit` keys. Each of the above top-level keys can also be provided as a child of either `create` and `edit`. For example:

```javascript
form: {
    username: {
        create: {
            label: 'Create a username',
            helpText: 'You can\'t change this later on, so choose wisely.'
        },
        edit: {
            label: 'The person\'s username',
            disabled: true,
            helpText: 'Once created, you can\'t edit the username.'
        }
    }
}
```

You can also use a combination of the default context and the specialized contexts `create` and `edit` contexts, for example:

```javascript
form: {
    username: {
        label: 'The person\'s username',
        edit: {
            label: 'Uneditable username'
        }
    }
}
```

On the create form, the label for the `username` field will be _The person's username_, but _Uneditable username_ on the edit form.

The specialized `create` and `edit` contexts always supersede the default context.

## {field-name}.label

The `label` property is optional. If not provided, it takes the label from the [Models label DSL](./models#models-label-dsl). If a label hasn't been provided for that particular model field, it simply shows the name of the field itself.

The label property gives you an opportunity to customize it explicitly for the create and edit views.

## {field-name}.placeholder

When you have the field of an appropriate type (such as text field), you can define the `placeholder` which sets the content of the HTML's `<input>` tag `placeholder` attribute.

When used in conjunction with a `ref` field, it can be used to create optional references. For example, a `select` in which the first `option` has no `value` but contains the `placeholder` value as the label.

## {field-name}.helpText

The `helpText` property can be used to supply additional text that sits below the form input control, providing contextual information to the user filling out the form.

## {field-name}.type

The `type` property is intended to help Linz with two things:

-   Manage the data that the field contains in an appropriate manner.
-   To determine which widget to use if the `widget` property wasn't provided.

`type` accepts the following strings:

-   `array` to render checkboxes for multiple select.
-   `boolean` to render radio inputs.
-   `date` to render a date input.
-   `digit` to render a text input with a regex of `[0-9]*`.
-   `documentarray` to render a custom control to manage multiple sub-documents.
-   `email` to render an email input.
-   `enum` to render a select input.
-   `hidden` to render a hidden input.
-   `number` to render a text input with a regex of `[0-9,.]*`.
-   `password` to render a password input.
-   `string` to render a text input.
-   `tel` to render a tel input with a regex of `^[0-9 +]+$`.
-   `text` to render a text input.
-   `url` to render a url input.

The default widget, and the widget for all other types is the text widget.

## {field-name}.default

The `default` property can be supplied to define the default value of the field. The default if provided, will be used when a field has no value.

If the `default` property is not provided, Linz will fallback to the `default` value as provided when defining the [Mongoose schemas](https://linzjs.readthedocs.io/en/latest/models.html#models-mongoose-schemas-reference).

## {field-name}.list

The `list` property is a special property for use with the `enum` type. It is used to provide all values from which a list field value can be derived.

Please bear in mind, that the `list` property is not involved in Mongoose validation.

The `list` property can either be an array of strings, or an array of objects.

For example, an array of strings:

```javascript
list: ['Dog', 'Cat', 'Sheep'];
```

If an array of objects is supplied, it must be in the format:

```javascript
form: {
    sounds: {
        list: [
            {
                label: 'Dog',
                value: 'woof.mp3',
            },
            {
                label: 'Cat',
                value: 'meow.mp3',
            },
            {
                label: 'Sheep',
                value: 'baa.mp3',
            },
        ];
    }
}
```

There is also a more advanced use case in which you can provide a function which Linz will execute. This will allow you to generate at run time rather than start time, after Linz has been initialized:

```javascript
form: {
    sounds: {
        list: function (cb) {
            return cb(null, {
                label: 'Dog',
                value: 'woof.mp3'
            },
            {
                label: 'Cat',
                value: 'meow.mp3'
            },
            {
                label: 'Sheep',
                value: 'baa.mp3'
            });
        }
    }
}
```

## {field-name}.visible

The boolean `visible` property can be set to a value of `false` to stop the field from being rendered on the form.

## {field-name}.disabled

The boolean `disabled` property can be set to a value of `true` to render the input field, with a [disabled attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-disabled).

## {field-name}.fieldset

The `fieldset` property should be supplied to control which fields are grouped together under the same [fieldset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset).

The `fieldset` property should be human readable, such as:

```javascript
form: {
    username: {
        fieldset: 'User access details';
    }
}
```

## {field-name}.widget

The `widget` property can be set to one of the many [built-in Linz widgets](https://github.com/linzjs/linz/tree/master/lib/formtools/widgets). For example:

```javascript
form: {
    sounds: {
        widget: linz.formtools.widget.multipleSelect();
        list: [
            {
                name: 'Dog',
                value: 'woof.mp3',
            },
            {
                name: 'Cat',
                value: 'meow.mp3',
            },
            {
                name: 'Sheep',
                value: 'baa.mp3',
            },
        ];
    }
}
```

## {field-name}.required

The boolean `required` property can be set to `true` to require that a field has a value before the form can be saved (using client-side) validation.

## {field-name}.query

The `query` property can be used to directly alter the Mongoose query object that is generated while querying the database for records to display.

`query` should be an object with the following keys:

-   `filter`
-   `sort`
-   `select`
-   `label`

## {field-name}.transform

The `transform` property will accept a function with the signature:

```javascript
transform(field, record);
```

If provided, it will be executed before a record is saved to the database. It is useful if you need to manipulate client side data before it is stored in the database.

In some instances, client side data requirements are different from that of data storage requirements. `transform` in combination with `transpose` can be used effectively to manage these scenarios.

## {field-name}.transpose

The `transpose` property will accept an object with context.

Currently, the following contexts are accepted:

-   `form` Used within context of forms and creating and editing model records.
-   `export` Only used for exporting records.

## {field-name}.transpose.form

The `transpose.form` property will accept a function with the signature:

```javascript
transpose.form(field, record);
```

If provided, it will be executed before a field's value is rendered to a form. It is useful if you'd like to manipulate the server-side data that is rendered to a form.

In some instances, data storage requirements are different form that of client side data requirements. `transpose` in combination with `transform` can be used effectively to manage these scenarios.

## {field-name}.transpose.export

The `transpose.export` property can accept a function with the signature:

```javascript
transpose.export (val) => Promise
```

If provided, it will be executed before a field's value is exported. It is useful if you'd like to manipulate the server-side data that is rendered to the export csv.
