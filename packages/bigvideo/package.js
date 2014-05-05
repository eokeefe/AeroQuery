Package.describe({
	summary: "Big video for backgrounds"
});

Package.on_use(function (api, where) {
	api.use([
		'jquery',
		'jquery-ui',
		'modernizr-meteor',
		'video'], 'client');

	api.add_files([
		'lib/jquery.imagesloaded.min.js',
		'lib/jquery.transit.min.js',
		'lib/bigvideo.js'], 'client');
});