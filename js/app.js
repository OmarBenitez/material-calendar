var app = angular.module('demoApp', []);

function daysInMonth(humanMonth, year) {
	return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();
}

function gobackDay(){
	$('.go-back-day').parent().parent('.view-day').fadeOut();
	setTimeout(function(){
		$('.view-day').children('.title').addClass('active');
	}, 500);
	setTimeout(function(){
		$('.view-month').children('.ink').removeClass('animate');
		$('.view-day').remove();
	}, 500);
	setTimeout(function(){
		$('.view-month').children('.ink').remove();
	}, 1000);
}

var init = function(){
	$('.month-item').click(function(e){	
		var month = '#' + $(this).attr('id') + '-month';


		var parent, ink, d, x, y;
		parent = $('.view-year');

		if(parent.find(".ink").length == 0)
			parent.prepend("<span style='background:" + $(month).children('.title').css('background-color') + "' class='ink'></span>");

		ink = parent.find(".ink");

		if(!ink.height() && !ink.width())
		{
			
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}

		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;

		ink.css({top: y+'px', left: x+'px'}).addClass("animate");

		$(month).delay(500).fadeIn();
		setTimeout(function(){
			$(month).children('.title').removeClass('active');
		}, 500);

	});


	$('.clickable').click(function(e){	
		var month = $(this).parent().parent().parent().children('.title').children('.month-name').text();
		var day = $(this).text();


		var parent, ink, d, x, y;
		parent = $(this).parent().parent().parent('.view-month');

		if(parent.find(".ink").length == 0)
			parent.prepend("<span style='background-color:" + $(this).parent().parent().parent().children('.title').css('background-color') + "' class='ink'></span>");

		ink = parent.find(".ink");




		if(!ink.height() && !ink.width())
		{

			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}



		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;


		ink.css({top: y+'px', left: x+'px'}).addClass("animate");

		$('.view-month').prepend("<div class='view-day'><div class='title active transition'><div onclick='gobackDay();' class='go-back-day transition'><span></span></div>" + "<span class='day-name'>" + day + "</span> " + "<span class='month-name small'>" + month + "</span>" + " <span class='date-year'>2015</span></div><div class='grid'><p class='centred'>//TODO: Insertar cositas aqui :33</p></div></div>");

		$('.view-day').delay(500).fadeIn();
		setTimeout(function(){
			$('.view-day').children('.title').removeClass('active');
		}, 500);

	});

$('.go-back-month').click(function(e){
	$(this).parent().parent('.view-month').fadeOut();
	setTimeout(function(){
		$('.view-month').children('.title').addClass('active');
	}, 500);
	setTimeout(function(){
		$('.view-year').children('.ink').removeClass('animate');
	}, 500);
	setTimeout(function(){
		$('.view-year').children('.ink').remove();
	}, 1000);
});	
}

app.directive('obMaterialCalendar', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/templates/obMaterialCalendar.html',
		scope: {
			
		},
		controller: ['$scope', '$timeout' , function($scope, $timeout){
			var d = new Date();
			$scope.Math = window.Math;
			$scope.showYear = true;
			

			$scope.locale = {
				meses: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
				mesesAbr: 'ENE_FEB_MAR_ABR_MAY_JUN_JUL_AGO_SEP_OCT_NOV_DIC'.split('_'),
				mesesIds: 'gen_feb_mar_apr_may_jun_jul_aug_sep_oct_nov_dec'.split('_'),
				dias : 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
				diasMin : 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
				diasIniciales : 'D_L_M_X_J_V_S'.split('_')
			}

			$scope.date = {
				year: d.getFullYear(),
				month: d.getMonth(),
				day: d.getDate(),
				dayOfWeek: d.getDay()
			}

			$scope.calendar = {};

			$timeout(function(){
				init();	
			})

			$scope.currentDate = function(){
				$scope.matrix = $scope.getMatrix($scope.date.year);
			};

			$scope.selectYear = function(y){
				$scope.showYear = false;
				$scope.date.year = $scope.date.year + y;
				$scope.currentDate();
				$timeout(function(){
					$scope.showYear = true;	
				});
			}

			$scope.selectMonth = function(i){
				$scope.date.month = i;
			}

			$scope.getWeeks4Month = function(i){
				return $scope.matrix[i];
			}

			$scope.negDay = function(day, month){

			}

			var weekArray = function(arr){
				for(var i = 0; i < 7; i++){
					if(!arr[i]) {
						arr[i] = -i;
					}
				}
				return arr;
			}

			
			$scope.getMatrix = function(y) {
				today= new Date("January 1, "+y);
				startDay = today.getDay() + 1 ;
				var arr = [];

				var months = 
				["January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"]

				for (var m = 0; m < 12; m++) {
					var month = [];
					day=1
					var monthLength = daysInMonth(m+1, y);

					for (var i=startDay;i<8;i++){
						month[0] = month[0] ? month[0] : [];
						month[0][i] = day;
						day++;
					}

					var week = 1;
					
					while (day <= monthLength) {
						month[week] = month[week] ? month[week] : [];
						for (var i=1;i<=7 && day<=monthLength;i++){
							month[week][i] = day;
							day++;
						}
						startDay=i
						week++;
					}
					arr.push(month);
				};

				var sanitizedArr = [];

				for (var i = 0; i < arr.length; i++) {
					if(arr[i]){
						sanitizedArr[sanitizedArr.length] = arr[i];
					}
					sanitizedArr[i] = [];
					for (var j = 0; j < arr[i].length; j++) {
						if(arr[i][j]){
							arr[i][j].shift();
							sanitizedArr[i].push(weekArray(arr[i][j]));
						}
					};
				};

				for (var i = 0; i < sanitizedArr.length; i++) {
					for(var j=0; j<sanitizedArr[i].length; j++){
						if(j === 0 || j === sanitizedArr[i].length-1 ){
							if(sanitizedArr[i][j][0] <=0){
								var lastDay = 0;
								for(var k=0; k<sanitizedArr[i][j].length; k++){
									if(sanitizedArr[i][j][k] > 0){
										lastDay = k;
										break;
									}
								}
								for(var day = lastDay - 1; day >= 0; day--){
									sanitizedArr[i][j][day] = - (daysInMonth(i, y) - (lastDay - 1 - day) );
								}
							}
							if(sanitizedArr[i][j][sanitizedArr[i][j].length -1] <= 0){
								var lastDay = 1;
								for(var k=0; k<sanitizedArr[i][j].length; k++){
									if(sanitizedArr[i][j][k] <= 0){
										sanitizedArr[i][j][k] = -lastDay;
										lastDay++;
									}
								}	
							}
						}
					}					
				};
				return sanitizedArr;

			}

		}]

	}
});

















