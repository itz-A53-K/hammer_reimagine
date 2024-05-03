(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

navAnimation()

function navAnimation() {

    var tl, isFinish = true

    function setTimeLine(elemID) {

        tl = gsap.timeline({
            paused: true,
            onStart: () => { isFinish = false },
            onReverseComplete: () => {
                $('nav .navLink').removeClass('active')
                isFinish = true
            }
        })

        tl.to("nav .dropdown-bg ", {
            height: 'calc(100vh - 65px)',
            paddingBottom: '1rem',
            duration: 0.3,
        })

        tl.to(`#${elemID} .dropdownCont`, {
            maxHeight: '65vh',
            padding: '1.5rem ',
            duration: 0.3,
            delay: 0.05
        })
        tl.to(`nav .dropdownCont h1`, {
            y: 0,
            duration: 0.3,
            opacity: 1,
            stagger: 0.05,

        })
    }


    $("nav .navLink.dropdown").mouseenter(function () {
        
        if (!$(this).hasClass('active') && isFinish) {
            $(this).addClass('active')
            setTimeLine($(this).attr('id'))
            tl.play()
        }
    })

    var menuClose_triggerElem = [$("nav .navLink:not(.dropdown)"), $("nav .contRight"), $('nav .dropdown-bg')]
    menuClose_triggerElem.forEach(function (elem) {
        elem.mouseenter(() => { tl.reverse() })
    })

}

//img silder

let slideIndex = 0;
showSlides(); // call showslide method

function showSlides() {
	let i;

	// get the array of divs' with classname image-sliderfade
	let slides = document.getElementsByClassName("image-sliderfade");

	// get the array of divs' with classname dot
	let dots = document.getElementsByClassName("dot");

	for (i = 0; i < slides.length; i++) {
		// initially set the display to
		// none for every image.
		slides[i].style.display = "none";
	}

	// increase by 1, Global variable
	slideIndex++;

	// check for boundary
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}

	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";

	// Change image every 2 seconds
	setTimeout(showSlides, 2000);
}
