

    var startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;
		



    window.addEventListener('touchstart', function(e){
        //touchsurface.innerHTML = ''
        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
		
		event.target.addEventListener('touchmove', function(e){
			e.preventDefault() // prevent scrolling when inside DIV
		}, false)
	 
		event.target.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0]
			dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
			elapsedTime = new Date().getTime() - startTime // get time elapsed
			// check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
			var swiperightBol = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
			
			var dir_str = "none";
			var dir_int = 0;
			if(swiperightBol){
				if(dist > 0){
					dir_str = "right";
					dir_int = 1;
				}else{
					dir_str = "left";
					dir_int = 2;
				}
				var _e = new CustomEvent("swap", {
					target : event.target,
					detail: {		
						direction : dir_str,
						direction_int : dir_int
					},
					bubbles: true,
					cancelable: true
				});
				trigger(event.target,"Swap",_e);			
			}
			
			//handleswipe(swiperightBol, event.target);
			e.preventDefault()
		}, false)

		function trigger(elem, name, event) {
		
			elem.dispatchEvent(event);
			eval(elem.getAttribute('on' + name));
		}
		
    }, false)