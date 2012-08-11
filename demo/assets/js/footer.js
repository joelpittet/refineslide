$(document).ready(function() { 
    

    
    $('#images').refineSlide({
	
	
		transition		  : 'scale',  // String (default 'cubeV'): Transition type ('random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
		fallback3d		  : 'fade', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
		// controls		    : 'arrows', // String (default 'thumbs'): Navigation type ('thumbs', 'arrows', null)
		useThumbs		   : false, // Bool (default true): Navigation type thumbnails
		useArrows		   : true, // Bool (default false): Navigation type previous and next arrows
		usePager		    : true,    // Bool (default false): Navigation type numbered pager links
		thumbMargin		 : 0,	   // Int (default 3): Percentage width of thumb margin
		pagerMargin		 : 0,	   // Int (default 3): Percentage width of thumb margin
		autoPlay		    : true,    // Int (default false): Auto-cycle slider
		delay			  : 5000,	// Int (default 5000) Time between slides in ms
		transitionDuration    : 700,	 // Int (default 800): Transition length in ms
		startSlide		  : 0,	   // Int (default 0): First slide
		keyNav			 : true,	// Bool (default true): Use left/right arrow keys to switch slide
		// captionWidth		: 25,	  // Int (default 50): Percentage of slide taken by caption
		// arrowTemplate	    : '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>', // String: The markup used for arrow controls (if arrows are used). Must use classes '.rs-next' & '.rs-prev'
		// onInit			 : function () {}, // Func: User-defined, fires with slider initialisation
		// onChange		    : function () {}, // Func: User-defined, fires with transition start
		// afterChange		 : function () {},  // Func: User-defined, fires after transition end

	   onInit : function () {
		  var slider = this.slider,
		  $triggers = $('.translist').find('> li > a');

		  $triggers.parent().find('a[href="#_'+ this.slider.settings['transition'] +'"]').addClass('active');

		  $triggers.on('click', function (e) {
			e.preventDefault();

			 if (!$(this).find('.unsupported').length) {
				$triggers.removeClass('active');
				$(this).addClass('active');
				slider.settings['transition'] = $(this).attr('href').replace('#_', '');
			 }
  
		  });

		  function support(result, bobble) {
			 var phrase = '';

			 if (!result) {
				phrase = ' not';
				$('#upper').find('div.bobble-'+ bobble).addClass('unsupported');
				$('#upper').find('div.bobble-js.bobble-css.unsupported').removeClass('bobble-css unsupported').text('JS');
			 }
		  }

		  support(this.slider.cssTransforms3d, '3d');
		  support(this.slider.cssTransitions, 'css');

	   }
    });
});