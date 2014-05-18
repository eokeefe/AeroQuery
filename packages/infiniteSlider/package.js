Package.describe({
  summary: "Infinite slider"
});

Package.on_use(function (api, where) {
  api.use('jquery', 'client');

  api.add_files('lib/infiniteSlider.js', 'client');
});
