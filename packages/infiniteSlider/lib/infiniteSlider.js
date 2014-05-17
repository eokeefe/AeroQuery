/* ////////////////////////////////////////////////////////////////////////////
//
// Infinite Slider
// V 1.0
// Alexandra Nantel
// Last Update 01/11/2012 10:22
//
/////////////////////////////////////////////////////////////////////////// */

function InfiniteSlider(wrapper,speed,duration,mode,easing,hover,animation){
	var _infiniteSlider = this;
		
	// If true : running
	this.animated = false;
	// Autorotation
	this.hover = hover;
	this.autorotation = animation;
	this.running = true;
	this.t;
	// Setting the container and controller
	this.wrapper = $(wrapper);
	this.container = $('.slider',this.wrapper);
	this.arrows = $('.slider-arrows',this.wrapper);
	this.count = $('.count',this.arrows);
	this.controls = $('.slider-controls',this.wrapper);
	this.infos = $('.slider-infos',this.wrapper);
	this.speed = speed;
	this.duration = duration;
	this.mode = mode; // slide - slidev - fade - demask
	this.easing = easing;
	this.width = this.container.width();
	this.height = this.container.height();
	// Setting index : slide ordered index || indexSlide : slide real index
	this.index = 0;
	this.indexSlide = 0;
	// Number of elements
	this.length = $('li', this.container).length - 1;
	
	/* Initialize
	//////////////////////////////////////////////////////////////////////// */
	
	// Bind
	if(this.hover){
		$(this.wrapper).live('mouseenter', function(){
			_infiniteSlider.stop(_infiniteSlider);
		});
		$(this.wrapper).live('mouseleave', function(){
			_infiniteSlider.start(_infiniteSlider);
		});
	}
	
	$('.next a',this.arrows).live('click', function(){
		_infiniteSlider.next(_infiniteSlider);
		return false;
	});
	$('.previous a',this.arrows).live('click', function(){
		_infiniteSlider.previous(_infiniteSlider);
		return false;
	});
	$('li a',this.controls).live('click', function(){
		_infiniteSlider.controlsClick($(this),_infiniteSlider);
		return false;
	});
	$(window).resize(function(){
		_infiniteSlider.reset(_infiniteSlider);
	});
	
	// Identify each slide and control with initial order
	$('li', this.container).each(function(){
		$(this).attr('data-slide',$(this).index() + 1);
		
		if($(this).index() == 0){
			$(this).addClass('active');
			$(_infiniteSlider.controls).append('<li data-slide="'+($(this).index() + 1)+'" class="active"><a href=""><span>'+$(this).index()+'</span></a></li>');
		} else {
			$(this).addClass('inactive');
			$(_infiniteSlider.controls).append('<li data-slide="'+($(this).index() + 1)+'" class="inactive"><a href=""><span>'+$(this).index()+'</span></a></li>');
		} 
	});
	
	// Fill Count values
	$(this.count).html((this.index + 1)+' / '+(this.length + 1));
	
	// Fill First Infos
	if($('li:eq(0)', this.container).attr('data-infos') != '') $(this.infos).html($('li:eq(0)', this.container).attr('data-infos'));
	
	// Disable if just one slide
	if(this.length == 0){
		$(this.controls).hide();
		this.autorotation = false;
	}
	
	// Initiate Positioning
	this.reset(_infiniteSlider);
	
	// Start Autorotation
	if(this.running) this.autoRotation(_infiniteSlider);
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Autorotation
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSlider.prototype.autoRotation = function(_infiniteSlider){
	clearTimeout(_infiniteSlider.t);	
	
	if($('li', _infiniteSlider.controls).length > 1 && _infiniteSlider.autorotation){
		if(_infiniteSlider.running){
			_infiniteSlider.t = setTimeout(function(){
				_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,_infiniteSlider.indexSlide + 1,_infiniteSlider)
			},_infiniteSlider.duration);
		}
	}
}

/* ////////////////////////////////////////////////////////////////////////////
//
// External Functions
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSlider.prototype.start = function(_infiniteSlider){ 
	_infiniteSlider.running = true;
	_infiniteSlider.autoRotation(_infiniteSlider);
	
	return false;
}

InfiniteSlider.prototype.stop = function(_infiniteSlider){ 
	clearTimeout(_infiniteSlider.t); 
	_infiniteSlider.running = false; 
	
	return false;
}

InfiniteSlider.prototype.next = function(_infiniteSlider){
	if(!_infiniteSlider.animated){
		_infiniteSlider.autorotation = false;
		clearTimeout(_infiniteSlider.t);
		_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,_infiniteSlider.indexSlide + 1,_infiniteSlider);
	}

	return false;
}

InfiniteSlider.prototype.previous = function(_infiniteSlider){
	if(!_infiniteSlider.animated){
		_infiniteSlider.autorotation = false;
		clearTimeout(_infiniteSlider.t);
		_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,_infiniteSlider.indexSlide - 1,_infiniteSlider);
	}

	return false;
}

InfiniteSlider.prototype.controlsClick = function(object,_infiniteSlider){
	if(!_infiniteSlider.animated){
		_infiniteSlider.autorotation = false;
		// Stop timer
		clearTimeout(_infiniteSlider.t);
		
		var clicked = $(object).parent().index();
		
		$('li',_infiniteSlider.container).each(function(){
			if($(this).attr('data-slide') == clicked + 1){
				_infiniteSlider.changeSlide(_infiniteSlider.indexSlide,$(this).index(),_infiniteSlider);
			} 
		});	
	}

	return false;
}

InfiniteSlider.prototype.reset = function(_infiniteSlider){
	_infiniteSlider.wrapper.height($(window).height());
	$('.centered-v', _infiniteSlider.wrapper).css('top', ($('.slider-alt-nav', _infiniteSlider.wrapper).height()/2 - $('.centered-v', _infiniteSlider.wrapper).height()/2)+'px');

	_infiniteSlider.stop(_infiniteSlider);
	_infiniteSlider.width = _infiniteSlider.container.width();
	_infiniteSlider.height = _infiniteSlider.container.height();
	$('li',_infiniteSlider.container).width(_infiniteSlider.width);
	
	if(_infiniteSlider.mode == 'demask'){
		$('li.inactive',_infiniteSlider.container).width(0);
		$('li img',_infiniteSlider.container).width(_infiniteSlider.width);
	}
		
	// Adjust Arrows
	$(_infiniteSlider.arrows).css('top', ($(_infiniteSlider.container).height()/2 - $('a',_infiniteSlider.arrows).height()/2)+'px');
	// Adjust Images Size
	$('li img',_infiniteSlider.container).each(function(){
		// Ratios
		var imageRatio = 1600/935;
		var wrapperRatio = _infiniteSlider.width/_infiniteSlider.height;
						
		// Resize
		if(imageRatio > wrapperRatio){
			$(this)
				.height(_infiniteSlider.height)
				.width(_infiniteSlider.height * imageRatio)
				.css('margin-left',-($(this).width()/2 - _infiniteSlider.width/2)+'px')
				.css('margin-top','0');
		} else {
			$(this)
				.width(_infiniteSlider.width)
				.height(_infiniteSlider.width / imageRatio)
				.css('margin-left','0')
				.css('margin-top',-($(this).height()/2 - _infiniteSlider.height/2)+'px');
		}
	});
	
	_infiniteSlider.start(_infiniteSlider);	

	return false;
}

/* ////////////////////////////////////////////////////////////////////////////
//
// Change slide
//
/////////////////////////////////////////////////////////////////////////// */

InfiniteSlider.prototype.changeSlide = function(current,clicked,_infiniteSlider){			
	_infiniteSlider.animated = true;
	var direction = 'next';
	if(clicked < current) direction = 'previous';
	
	// Check limits
	if(clicked > _infiniteSlider.length){
		clicked = 0;
	} else if(clicked < 0){
		clicked = _infiniteSlider.length;
	}
		
	// Redefine active slide
	$('> ul > li',_infiniteSlider.container).removeClass('active').addClass('inactive');
	$('> ul > li',_infiniteSlider.container).eq(clicked).removeClass('inactive').addClass('active');
			
	_infiniteSlider.index = parseInt($('.active',_infiniteSlider.container).attr('data-slide')) - 1;
	_infiniteSlider.indexSlide = $('.active',_infiniteSlider.container).index();
	
	// Redefine active control
	$('li',_infiniteSlider.controls).removeClass('active');
	$('li',_infiniteSlider.controls).eq(_infiniteSlider.index).addClass('active');
	
	// Change Count
	$(_infiniteSlider.count).html($('.active',_infiniteSlider.container).attr('data-slide')+' / '+(_infiniteSlider.length + 1));
	
	// Animate Infos
	$(_infiniteSlider.infos).fadeOut(_infiniteSlider.speed/2, function(){
		if(typeof $('li.active',_infiniteSlider.container).attr('data-infos') !== "undefined"){
			$(_infiniteSlider.infos).html($('li.active',_infiniteSlider.container).attr('data-infos'));
			$(this).fadeIn(_infiniteSlider.speed/2);
		} else {
			$(_infiniteSlider.infos).html('');
		}
	});
	
	// Animate Slides
	if(_infiniteSlider.mode == 'slide'){
		// Place new slide AFTER
		if(direction == 'next'){
			$('li',_infiniteSlider.container).eq(clicked)
				.css('left', _infiniteSlider.width+'px')
				.show();
			
			// Animate slides
			$('li',_infiniteSlider.container).animate({left: '-='+_infiniteSlider.width}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
		// Place new slide BEFORE
		else {
			$('li',_infiniteSlider.container).eq(clicked)
				.css('left', -_infiniteSlider.width+'px')
				.show();
			
			// Animate slides
			$('li',_infiniteSlider.container).animate({left: '+='+_infiniteSlider.width}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
	}	else if(_infiniteSlider.mode == 'slidev'){
		// Place new slide AFTER
		if(direction == 'next'){
			$('li',_infiniteSlider.container).eq(clicked)
				.css('top', _infiniteSlider.height+'px')
				.show();
			
			// Animate slides
			$('li',_infiniteSlider.container).animate({top: '-='+_infiniteSlider.height}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
		// Place new slide BEFORE
		else {
			$('li',_infiniteSlider.container).eq(clicked)
				.css('top', -_infiniteSlider.height+'px')
				.show();
			
			// Animate slides
			$('li',_infiniteSlider.container).animate({top: '+='+_infiniteSlider.height}, {'duration': _infiniteSlider.speed, easing: _infiniteSlider.easing, 'complete': function(){				
				_infiniteSlider.animated = false;
				$('li.inactive',_infiniteSlider.container).hide();
				if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
			}});
		}
	} else if(_infiniteSlider.mode == 'fade'){
		// Animate Slides
		$('> ul > li.active',_infiniteSlider.container).fadeIn(_infiniteSlider.speed, function(){
			$('> ul > li',_infiniteSlider.container).eq(current).hide();
			_infiniteSlider.animated = false;
			if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
		});
	} else if(_infiniteSlider.mode == 'demask'){
		$('> ul > li.active',_infiniteSlider.container).animate({width: _infiniteSlider.width}, _infiniteSlider.speed, _infiniteSlider.easing, function(){
			$('> ul > li.inactive',_infiniteSlider.container).width(0);
			_infiniteSlider.animated = false;
			if(_infiniteSlider.running) _infiniteSlider.autoRotation(_infiniteSlider);
		});
	}
	
}