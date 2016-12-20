$(document).ready(function(){
	$('#weather-form').submit(function(){
		event.preventDefault();
		var location = $('#location').val();
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ location +'&units=imperial&APPID=' + apiKey;
		
		$.getJSON(weatherUrl, function(weatherData){
			console.log(weatherData);
			var currentTemp = weatherData.main.temp;
			var name = weatherData.name;
			var icon = weatherData.weather[0].icon + '.png';
			$('#currentTemp').html("<img src='http://openweathermap.org/img/w/"+ icon +"'></img>The temp in " + name + " is currently " + currentTemp);
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');

			var lineColor = 'black';
			if(currentTemp < 32){
				lineColor = '#AAF7FF';
			}else if(currentTemp < 60){
				lineColor = '#129793';
			}else if(currentTemp < 70){
				lineColor = '#80f470';
			}else if(currentTemp < 80){
				lineColor = '#ffc32d';
			}else{
				lineColor = '#f74f5d';
			}
			
			var currentPercent = 0;
			function animate(current){
				context.clearRect(0,0,500, 500);
				context.fillStyle = "#ccc";
				context.beginPath();
				context.arc(155,75,50,Math.PI * 0,Math.PI * 2);
				context.closePath();
				context.fill();

				context.font = "40px Arial";
				context.fillStyle = '#FFF';
				context.fillText((Math.floor(currentTemp) + "\xB0F"),110,90);

				context.lineWidth = 20;
				context.strokeStyle = lineColor;
				context.beginPath();
				context.arc(155,75,60,Math.PI * 1.5,Math.PI * 2 * current + Math.PI * 1.5);
				context.stroke();
				currentPercent++;
				if(currentPercent < currentTemp){
					requestAnimationFrame(function(){
						animate(currentPercent / 100);
					});
				}

			}
			animate();
		});
	});
});