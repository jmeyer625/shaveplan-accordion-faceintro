$(document).on('ready', function(){
	var eventClick = jQuery.Event('click');
	var plans = {
		'everyday' : {
			'image' : 'images/faces/everyday.png',
			'text' : 'Everyday Shaver - Ships every 2 months',
			months : 2
		},
		'occasional' : {
			'image' : 'images/faces/occasional.png',
			'text' : 'Occasional Shaver - Ships every 3 months',
			months : 3
		},
		'infrequent' : {
			'image' : 'images/faces/infrequent.png',
			'text' : 'Infrequent Shaver - Ships every 5 months',
			months : 5
		}
	}

	trumanImages = {
		'truman-blue' : "images/cart/truman-handle-nautilus-blue.jpg",
		'truman-orange' : "images/cart/truman-handle-total-orange.jpg",
		'truman-olive' :"images/cart/truman-handle-olive-107.jpg",
		'truman-ivory':"images/cart/truman-handle-ivory.jpg"
	}

	trumanTitles = {
		'truman-blue' : "Nautilus Blue",
		'truman-orange' : "Total Orange",
		'truman-olive' :"Olive 107",
		'truman-ivory':"Ivory"
	}

	var makeDollars = function(num) {
		
		if(num) {
			return '$' + num.toFixed(2);
		} else {
			return '$0.00'
		}
		
	}

	var renderPlanSummary = function(planObject){
		var source = $('#shaverSummaryTemplate').html();
		var template = Handlebars.compile(source);
		return template(planObject)
	}

	var renderTextSummary = function(textObject) {
		var source = $('#textSummaryTemplate').html();
		var template = Handlebars.compile(source);
		return template(textObject)
	}

	var renderHandleSummary = function(handleObject) {
		var source = $('#handleSummaryTemplate').html();
		var template = Handlebars.compile(source);
		return template(handleObject)
	}

	var renderZeroSummary = function() {
		var source = $('#zeroSummaryTemplate').html();
		var template = Handlebars.compile(source);
		return template
	}

	var getOrderData = function(){
		var planKey = $('.plan-summary').attr('data-plan') || 'everyday';
		var bladeQuantity = parseInt($('#bladesQuantity').val());
		var gelQuantity = parseInt($('#gelQuantity').val());
		var handleColor = $('.handle-selected').attr('data-product');
		var handleImage = trumanImages[handleColor];
		var handleTitle = trumanTitles[handleColor];
		var asQuantity = parseInt($('#asQuantity').val());
		var scQuantity = parseInt($('#scQuantity').val());
		return {
			plan : planKey,
			bladeQuantity: bladeQuantity,
			bladePrice: 15,
			gelQuantity: gelQuantity,
			gelPrice: 7.5,
			handleColor: handleColor,
			handleImage: handleImage,
			handleTitle: handleTitle,
			asQuantity: asQuantity,
			asPrice: 10,
			scQuantity: scQuantity,
			scPrice: 8
		}
	}

	var updateOrderSummary = function(data, plans) {
		if(data['bladeQuantity']) {
			$('#bladeQuantitySummary').closest('.product').addClass('quantity').removeClass('no-quantity');
			$('#bladeQuantityRecurringSummary').closest('.product').addClass('quantity').removeClass('no-quantity');
		} else {
			$('#bladeQuantitySummary').closest('.product').removeClass('quantity').addClass('no-quantity');
			$('#bladeQuantityRecurringSummary').closest('.product').removeClass('quantity').addClass('no-quantity');
		}
		if(data['gelQuantity']) {
			$('#gelQuantitySummary').closest('.product').addClass('quantity').removeClass('no-quantity');
			$('#gelQuantityRecurringSummary').closest('.product').addClass('quantity').removeClass('no-quantity');
		} else {
			$('#gelQuantitySummary').closest('.product').removeClass('quantity').addClass('no-quantity');
			$('#gelQuantityRecurringSummary').closest('.product').removeClass('quantity').addClass('no-quantity');
		}
		if(data['scQuantity']) {
			$('#scQuantitySummary').closest('.product').addClass('quantity').removeClass('no-quantity');
			$('#scQuantityRecurringSummary').closest('.product').addClass('quantity').removeClass('no-quantity');
		} else {
			$('#scQuantitySummary').closest('.product').removeClass('quantity').addClass('no-quantity');
			$('#scQuantityRecurringSummary').closest('.product').removeClass('quantity').addClass('no-quantity');
		}
		if(data['asQuantity']) {
			$('#asQuantitySummary').closest('.product').addClass('quantity').removeClass('no-quantity');
			$('#asQuantityRecurringSummary').closest('.product').addClass('quantity').removeClass('no-quantity');
		} else {
			$('#asQuantitySummary').closest('.product').removeClass('quantity').addClass('no-quantity');
			$('#asQuantityRecurringSummary').closest('.product').removeClass('quantity').addClass('no-quantity');
		}
		$('#bladeQuantitySummary').text(data['bladeQuantity']);
		$('#gelQuantitySummary').text(data['gelQuantity']);
		$('#scQuantitySummary').text(data['scQuantity']);
		$('#asQuantitySummary').text(data['asQuantity']);
		$('#handleCart').attr('src',data['handleImage']);
		$('#handleTitle').text(data['handleTitle']);
		$('#bladeQuantityRecurringSummary').text(data['bladeQuantity']);
		$('#gelQuantityRecurringSummary').text(data['gelQuantity']);
		$('#scQuantityRecurringSummary').text(data['scQuantity']);
		$('#asQuantityRecurringSummary').text(data['asQuantity']);

		var months = plans[data['plan']]['months']

		$('#months').text(months);

		var bladeTotal = data['bladeQuantity'] * data['bladePrice'];
		var scTotal = data['scQuantity'] * data['scPrice'];
		var asTotal = data['asQuantity'] * data['asPrice'];
		var gelTotal = data['gelQuantity'] * data['gelPrice'];

		$('#bladeTotalPrice').text(makeDollars(bladeTotal));
		$('#gelTotalPrice').text(makeDollars(gelTotal));
		$('#scTotalPrice').text(makeDollars(scTotal));
		$('#asTotalPrice').text(makeDollars(asTotal));
		$('#bladeTotalRecurringPrice').text(makeDollars(bladeTotal));
		$('#gelTotalRecurringPrice').text(makeDollars(gelTotal));
		$('#scTotalRecurringPrice').text(makeDollars(scTotal));
		$('#asTotalRecurringPrice').text(makeDollars(asTotal));
		console.log(bladeTotal + scTotal + asTotal + gelTotal)
		var total = bladeTotal + scTotal + asTotal + gelTotal;
		console.log('hello')
		$('#oneTimeTotal').text(makeDollars(total));
		$('#monthlyTotal').text(makeDollars(total / months) + ' / month');
		$('#recurringTotal').text(makeDollars(total));
		$('#monthsSummary').text(months);

		$('#subTotal').text(makeDollars(total));

	}

	var currentSection = 1;

	$(document).on('click', '.button', function(e){
		e.preventDefault();
		$(this).closest('.accordion-section-body').slideUp(100, function(){
			$(this).closest('.accordion-section-body').removeClass('active-section').addClass('inactive-section').removeAttr('style');
		});
		var nextSection = $(this).closest('.accordion-section-body').closest('.accordion-section').next()
		nextSection.find('.accordion-section-body').removeClass('inactive-section').slideDown(100, function(){
			nextSection.find('.accordion-section-body').addClass('active-section');
			nextSection.find('.accordion-title').addClass('active-title')
		});
		currentSection += 1;
	});

	$(document).on('click', '.accordion-title', function(e){
		e.preventDefault();
		if ($(this).hasClass('active-title')) {
			currentSection = $('.accordion-section[data-section="'+currentSection+'"]');
			currentSection.find('.accordion-section-body').removeClass('active-section').addClass('inactive-section');
			console.log($(this).next());
			$(this).next().removeClass('inactive-section').addClass('active-section');
			currentSection = parseInt($(this).closest('.accordion-section').attr('data-section'));
			console.log(currentSection);
			data = getOrderData()
			updateOrderSummary(data,plans)
		}
		
		
	});

	$(document).on('click', '.handle-div', function(e){
		if (!$(this).hasClass('handle-selected')){
			$('.handle-div').removeClass('handle-selected');
			$(this).addClass('handle-selected');
		}
	});

	$(document).on('click', '.enroll', function(e){
		e.preventDefault();
		var planKey = $(this).attr('data-plan')
		var plan = plans[planKey];
		var newEl = renderPlanSummary(plan);
		console.log(newEl)
		$('.accordion-section[data-section="1"]').find('.section-summary').empty().append(newEl).removeClass('summary-inactive');
		data = getOrderData()
		updateOrderSummary(data,plans)
		$('.plan-summary').attr('data-plan', planKey)
	});

	$(document).on('click', '#bladesComplete', function(e){
		var items = {
			'blades' : {
				'product': "Harry's Blades 8-pack",
				'unit-price': 15
			},
			'gel' : {
				'product': "Foaming Shave Gel",
				'unit-price': 7.5
			}
		}

		var bladeQuantity = $('#bladesQuantity').val();
		items['blades']['price'] = makeDollars(bladeQuantity * items['blades']['unit-price'])
		items['blades']['quantity'] = bladeQuantity
		var gelQuantity = $('#gelQuantity').val();
		items['gel']['price'] = makeDollars(gelQuantity * items['gel']['unit-price'])
		items['gel']['quantity'] = gelQuantity
		if (!gelQuantity) {
			delete items['gel']
		}
		var newEl = renderTextSummary({items:items});
		$(this).closest('.accordion-section').find('.section-summary').removeClass('summary-inactive').empty().append(newEl);
		data = getOrderData()
		updateOrderSummary(data,plans)
	});

	$(document).on('click', '#handleComplete', function(e){
		var handleColor = $('.handle-selected').find('.color-selector').css('background-color');
		var handleName = $('.handle-selected').find('.handle-title').text();
		var handleObject = {'text': 'Truman - ' + handleName, 'color': handleColor}
		var newEl = renderHandleSummary(handleObject);
		$(this).closest('.accordion-section').find('.section-summary').removeClass('summary-inactive').empty().append(newEl);
		data = getOrderData()
		updateOrderSummary(data,plans)
	});

	$(document).on('click', '#otherComplete', function(e){
		var items = {
			'as' : {
				'product': "After Shave Moisturizer",
				'unit-price' : 10
			},
			'sc' : {
				'product' : "Shave Cream",
				'unit-price' : 8
			}
		}
		var asQuantity = parseInt($('#asQuantity').val());
		items['as']['price'] = makeDollars(asQuantity * items['as']['unit-price']);
		items['as']['quantity'] = asQuantity
		if (!asQuantity) {
			delete items['as']
		}
		var scQuantity = parseInt($('#scQuantity').val());
		items['sc']['price'] = makeDollars(scQuantity * items['sc']['unit-price']);
		items['sc']['quantity'] = scQuantity
		if (!scQuantity) {
			delete items['sc']
		}
		var textObject = {'text':'text'}
		if (!(asQuantity || scQuantity)) {
			var newEl = renderZeroSummary(textObject);
			$(this).closest('.accordion-section').find('.section-summary').removeClass('summary-inactive').empty().append(newEl);

		} else {
			
			var newEl = renderTextSummary({items:items});
			$(this).closest('.accordion-section').find('.section-summary').removeClass('summary-inactive').empty().append(newEl);

		}
		data = getOrderData()
		updateOrderSummary(data,plans)
	});

	$(document).on('click', '.init-enroll', function(e){
		e.preventDefault();
		var plan = $(this).attr('data-plan');
		$(this).closest('.face-landing').css('display','none');
		$('.accordion').css('display','block');
		var planKey = $(this).attr('data-plan')
		var plan = plans[planKey];
		var newEl = renderPlanSummary(plan);
		console.log(newEl)
		$('.accordion-section[data-section="1"]').find('.section-summary').empty().append(newEl).removeClass('summary-inactive');
		$('.accordion-section[data-section="1"]').find('.accordion-section-body').removeClass('active-section').addClass('inactive-section');
		data = getOrderData()
		updateOrderSummary(data,plans);
		$('.plan-summary').attr('data-plan', planKey);
		$('.accordion-section[data-section="2"').find('.accordion-title').addClass('active-title');
		$('.accordion-section[data-section="2"').find('.next-button').find('a').trigger(eventClick);
		$(window).scrollTop(65);
		currentSection = 3;
		

	})

});