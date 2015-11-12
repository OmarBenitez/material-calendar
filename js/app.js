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