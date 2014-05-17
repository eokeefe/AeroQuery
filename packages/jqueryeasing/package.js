Package.describe({
  summary: "jquery easing"
});

Package.on_use(function (api, where) {
  api.use('jquery', 'client');

  api.add_files('lib/jqueryeasing.js', 'client');
});
