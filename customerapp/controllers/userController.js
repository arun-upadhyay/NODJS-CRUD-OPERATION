module.exports.controller = function(app){

	app.get('/user/profile', function(req, res){
		res.send("user profile");
	});
};