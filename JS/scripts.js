$(document).ready(function(){
	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units=imperial&APPID=' + apiKey;
		
		$.getJSON(weatherUrl, function(weatherData){
			console.log(weatherData);
			var currentTemp = weatherData.main.temp;
			var name = weatherData.name;
			$('#currentTemp').html("The temp in " + name + " is currently " + currentTemp);
			console.log(currentTemp);
		});
	});
});