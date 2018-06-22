var getUserJSON = function(username) {
	var user_json = null;
	url = 'http://localhost:5000/user/' + username;
	try {
		$.ajax({
			url: url,
			dataType: 'json',
			async: false,
			success: function(data) {
				console.log('Recieved profile data for user: ', username);
				user_json = data;
			},
			error: function(r, s, e) {
				if(e == 'NOT FOUND') {
					$('#username-form').addClass('has-error');
				}
			}
		});
	}
	catch(err) {
		console.log(err);
	}
	return user_json;
}

$(document).ready(function(){
	$('#username-form').submit(function(ev) {
		ev.preventDefault();
		$('#username-form').removeClass('has-error')

		profile_data = getUserJSON($('#username-form #username').val());
		console.log(profile_data);
	});
});
	