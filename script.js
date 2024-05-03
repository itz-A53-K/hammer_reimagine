(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

navAnimation()

function navAnimation() {

    var tl = gsap.timeline({ paused: true })

    tl.to("nav .dropdown-bg ", {
        height: 'calc(100vh - 65px)',
        paddingBottom: '1rem',
        duration: 0.3,
    })
    tl.to("nav .dropdownCont ", {
        height: '55vh',
        padding: 20,
        duration: 0.4,
        delay: 0.1
    })
    tl.from("nav .dropdownCont h1", {
        y: 100,
        duration: 0.3,
        opacity: 0,
        stagger: 0.1
    })

    $("nav .navLink.innerContent").mouseenter(() => { tl.play() })

    var menuClose_triggerElem = [$("nav .navLink:not(.innerContent)"), $("nav .contRight"), $('nav .dropdownCont')]
    menuClose_triggerElem.forEach(function (elem, index) {
        
        if (index == menuClose_triggerElem.length - 1) {
            elem.mouseleave(() => { tl.reverse() })
        }
        else {
            elem.mouseenter(() => { tl.reverse() })
        }

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
