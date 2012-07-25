$(document).ready(function() { 
    
    //Timer to manage pause and resume
    function Timer(callback, delay) {
            var timerId, 
                startTime = new Date(), 
                timeRemaining = delay;
            
            this.pause = function() {//Pause timer
                window.clearTimeout(timerId);
                var pauseTime = new Date();
                var timeDifference = pauseTime - startTime;
                console.log('pauseTime', pauseTime, 'startTime', startTime );       
                console.log('timeRemaining', timeRemaining, 'timeDifference', timeDifference );
                
                timeRemaining = timeRemaining - timeDifference;
                //timeRemaining -= delay - timeDifference;
                console.log('timeRemaining result', timeRemaining);
                console.log('Paused');
            };

            this.resume = function() {//Resume timer
                timerId = window.setTimeout(callback, timeRemaining);
                startTime = new Date();
                console.log('Resumed');
             };
                        
            this.reset = function() {//Resets the timmer value
                timeRemaining = delay;
                startTime = new Date();
                console.log('Reseting', timeRemaining);
            };
     }    
    
    $('#images').refineSlide({
	
	
		transition            : 'random',  // String (default 'cubeV'): Transition type ('random', 'cubeH', 'cubeV', 'fade', 'sliceH', 'sliceV', 'slideH', 'slideV', 'scale', 'blockScale', 'kaleidoscope', 'fan', 'blindH', 'blindV')
		fallback3d            : 'fade', // String (default 'sliceV'): Fallback for browsers that support transitions, but not 3d transforms (only used if primary transition makes use of 3d-transforms)
		// controls              : 'arrows', // String (default 'thumbs'): Navigation type ('thumbs', 'arrows', null)
		useThumbs             : true, // Bool (default true): Navigation type thumbnails
		useArrows             : true, // Bool (default false): Navigation type previous and next arrows
		usePager              : true,    // Bool (default false): Navigation type numbered pager links
		thumbMargin           : 0,        // Int (default 3): Percentage width of thumb margin
		pagerMargin           : 0,        // Int (default 3): Percentage width of thumb margin
		autoPlay              : true,    // Int (default false): Auto-cycle slider
		delay                 : 5000,     // Int (default 5000) Time between slides in ms
		transitionDuration    : 700,      // Int (default 800): Transition length in ms
		startSlide            : 0,        // Int (default 0): First slide
		keyNav                : true,     // Bool (default true): Use left/right arrow keys to switch slide
		// captionWidth          : 25,       // Int (default 50): Percentage of slide taken by caption
		// arrowTemplate         : '<div class="rs-arrows"><a href="#" class="rs-prev"></a><a href="#" class="rs-next"></a></div>', // String: The markup used for arrow controls (if arrows are used). Must use classes '.rs-next' & '.rs-prev'
		// onInit                : function () {}, // Func: User-defined, fires with slider initialisation
		// onChange              : function () {}, // Func: User-defined, fires with transition start
		// afterChange           : function () {},  // Func: User-defined, fires after transition end

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
            
            //Luke's Code starts
             console.log('----Creating new timer and resuming----');           
            this.slider.timer = new Timer(function(){//Initiate the Timer
                console.log('callback resumed');
            }, this.delay);  
            
            this.slider.timer.resume();

        },

        onChange : function() {
            console.log('----Transition start, end of slide duration/delay----');             
            this.slider.timer.pause();//when the slide transition is on pause timer
                        
            /*var $startTime = new date().getTime();
            var pauseLeftOverTime;
            //timePercentage = timer/delay;
            //widthPercentage = timerWidth/pagerWidth;
            //pauseLeftOver = delay-delay*timePercentage;*/   
        },
        afterChange: function() {
            console.log('----Start new slide, end transition----');            
            this.slider.timer.reset();//Reset timer when the new slide starts
            this.slider.timer.resume();//when the new slide starts resume timer
            
        }
    });
});