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
