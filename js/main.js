var getUserJSON = function(username) {
	var user_json = null;
	url = 'http://localhost:5000/user/' + username;
	try {
		$.ajax({
			url: url,
			dataType: 'json',
			async: false,
			success: function(data) {
				console.log('Received profile data for user: ', username);
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

var populateProfile = function(data) {
	if(!data.default_profile_image) {
		$('#profile #image').attr('src', data.profile_image_url.slice(0, -10) + '400x400.jpg')
	}
	$('#profile #name').text(data.name);

	console.log(data.followers_count, data.friends_count, data.favourites_count)
	$('#profile #followers .data').text(data.followers_count);
	$('#profile #friends .data').text(data.friends_count);
	$('#profile #favourites .data').text(data.favourites_count);
}

var clearProfile = function() {
	$('#profile #image').attr('src', 'images/default_profile_image.png');
	$('#profile #name').text('');

	console.log(data.followers_count, data.friends_count, data.favourites_count)
	$('#profile #followers .data').text('');
	$('#profile #friends .data').text('');
	$('#profile #favourites .data').text('');
}

var activateDetailsView = function(data) {
	populateProfile(data);
	$('#landing').addClass('hidden')
}

$(document).ready(function(){
	$('#username-form').submit(function(ev) {
		ev.preventDefault();
		$('#username-form').removeClass('has-error')

		profile_data = getUserJSON($('#username-form #username').val());
		console.log(profile_data);
		
		activateDetailsView(profile_data);
	});
});
	