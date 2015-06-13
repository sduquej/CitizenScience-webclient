# web-client-app

This is the sample application for data collection of Citizen Science projects. It was
generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1, which leverages Angular.js projects best practices.

## Form configuration

When cloning this application make sure to include a valid form configuration file named `form_fields.json` in the [data](./app/data/) folder of your app.

Some examples are provided:
* [Mammal Observation](./app/data/form_fields_mammalObservation.json)
* [Animal Observation](./app/data/form_fields_reportExample.json)

The Form Builder can be used to interactively create this file.

## Tasks
### Documentation

Running `grunt docs` will generate the HTML documentation from the code.

### Build & development

Run `grunt` for building and `grunt serve` for preview.

### Testing

Running `grunt test` will run the unit tests with karma.
