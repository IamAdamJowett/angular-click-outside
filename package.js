Package.describe({
  name: 'firebait:angular-click-outside',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'An angular directive to detect a click outside of an elements scope.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/firebait/angular-click-outside.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.addFiles([
    'clickoutside.directive.js'], 'client');
});

Package.onTest(function(api) {
});
