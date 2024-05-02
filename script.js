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
