Package.describe({
    summary: "background video"
});

Package.on_use(function (api, where) {
    api.use(['bigVideo',
    	'video',
    	'templating'], 'client');

    api.add_files(['lib/bkVideo.html',
    	'lib/bkVideo.js'], 'client');
});