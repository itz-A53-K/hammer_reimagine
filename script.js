(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

btnAnimations()
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

function btnAnimations() {

    //btn animation 1
    $(".btn1").html($(".btn1").html() + '<div class="btnbg"></div>')
    var btn1TL = gsap.timeline({ paused: true })
    btn1TL.to(".btn1", {
        '--beforeLeft': '50%',
        '--afterLeft': '50%',
        "--opacity": 1,
        duration: 0.2,
    })
    btn1TL.to(".btn1 .btnbg", {
        scale: 1,
        opacity: 1,
        duration: 0.15,
    }, 'a')
    btn1TL.to(".btn1 ", {
        color: 'white',
        gap: '1rem',
        duration: 0.15,
    }, 'a')




    $(".btn1").hover(
        function () {
            btn1TL.play()
        },
        function () {
            btn1TL.reverse()
        }
    )
}


//img silder

// call showslide method
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function showSlides() {

    let slides = $("#home .sliderItem");

    for (let i = slides.length -1; i >=0; i--) {

        let j = i - 1
        if (j <0) { j = slides.length-1 }

        let curSlide = $(slides[i])
        let nextSlide = $(slides[j])

        await sleep(8000)

        nextSlide.addClass("active")

        let tl=gsap.timeline()
        tl.to(curSlide, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                curSlide.removeClass("active").removeClass('zHigh')
                nextSlide.addClass("zHigh")
            }
        })
        tl.set(curSlide, {
            scale: 1,
            opacity: 1
        })

        if (i == 0) {
            i = slides.length;
        }
    }

}

showSlides();
