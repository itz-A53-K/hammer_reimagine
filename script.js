(function () {
    const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
            smoothWheel: true,
            smoothTouch: true,
            wheelMultiplier: 0.4,
            touchMultiplier: 0.8,
            easing: 'none',

        }
    });
})();


function navAnimation() {

    $("nav .navLink.dropdown").each(function () {

        var dropdown = $(this)
        var tl = gsap.timeline({ paused: true })

        tl.to("nav .dropdown-bg ", {
            height: 'calc(100vh - 65px)',
            paddingBottom: '1rem',
            duration: 0.3,
        })

        tl.to(dropdown.children('.dropdownCont'), {
            maxHeight: '65vh',
            padding: '1.5rem ',
            duration: 0.2,
        })
        tl.to(dropdown.find('.dropdownCont h1'), {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,

        })

        dropdown.hover(
            function () {
                tl.play()
            },
            function () {
                tl.reverse()
            }
        )

    })


    //hamburger menu

    var tl_menuSM= gsap.timeline({paused: true})

    tl_menuSM.to("nav .menu-sm",{
        right: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'ease.inOut'
    })
    tl_menuSM.from("nav .menu-sm .contTop i",{
        opacity: 0,
        delay: 0.2,
        duration: 0.2,
        stagger: 0.1
    })
    tl_menuSM.from("nav .menu-sm .navLink h1",{
        rotate: '50deg',
        y: '100%',
        opacity: 0,
        duration: 0.2,
        stagger: 0.1
    })

    $("#hamburger").click(function(){
        tl_menuSM.play()
    })
    $("nav .menu-sm .close-menu-sm").click(function(){
        tl_menuSM.reverse()
    })


}


const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function showSlides() {

    let slides = $("#home .sliderItem");

    for (let i = slides.length - 1; i >= 0; i--) {

        let j = i - 1
        if (j < 0) { j = slides.length - 1 }

        let curSlide = $(slides[i])
        let nextSlide = $(slides[j])

        await sleep(5000)

        nextSlide.addClass("active")

        let tl = gsap.timeline()
        tl.to(curSlide, {
            scale: 2,
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


function populateCard() {
    var data = [
        {
            'bg': 'smartwatch.webp',
            'theme': '',
            'h4': 'Smart Watches',
            'p': 'Bluetooth Calling Smartwatch'
        },
        {
            'bg': 'wireless_headphones.webp',
            'theme': '',
            'h4': 'Headphones',
            'p': 'Hammer Bluetooth Headphones'
        },
        {
            'bg': 'tootbrush.webp',
            'theme': 'light',
            'h4': 'Electric Toothbrushes',
            'p': 'Hammer Electric Toothbrush'
        },
        {
            'bg': 'TWS.webp',
            'theme': '',
            'h4': 'True Wireless Earbuds',
            'p': 'Hammer True Wireless Earbuds'
        },
    ]

    data.forEach(function (item) {

        var card = `<div class="cardCont">
                    <div class="card" data-bg="${item.bg}" th="${item.theme}">
                        <h4>${item.h4}</h4>
                        <div class="cardFooter">
                            <p>${item.p}</p>
                            <button class="btn2">Buy Now</button>
                        </div>            
                    </div>
                </div>`

        $("#topCategory .container").append(card)
    })
}


function topCategory() {
    populateCard()

    var cardCont = $("#topCategory .cardCont");

    cardCont.each(function () {
        card = $(this).children(".card")

        card.css('background-image', `url('./img/topCategory/${card.data('bg')}')`)

    });


    gsap.to(cardCont, {
        x: -(cardCont.length - 2) * 100 + '%',

        scrollTrigger: {
            trigger: "#topCategory",
            start: "top top",
            end: `bottom 0%`,
            pin: true,
            scrub: 2
        }
    })
}

function stripAnim() {

    var ply = revply = false

    $(window).on('wheel', function (dets) {

        var deltaY = dets.originalEvent.deltaY

        if (deltaY > 0) {
            if (ply == false) {
                ply = true
                revply = false
                gsap.fromTo("#strip .container",
                    {
                        transform: 'translateX(0%)',
                        duration: 10,
                        repeat: -1,
                        ease: "none"
                    },
                    {
                        transform: 'translateX(-100%)',
                        duration: 10,
                        repeat: -1,
                        ease: "none"
                    },
                )
                $("#strip .container div>img").removeClass('reverse')
            }

        }
        else {
            if (revply == false) {
                revply = true
                ply = false
                gsap.fromTo("#strip .container",
                    {
                        transform: 'translateX(-100%)',
                        duration: 10,
                        repeat: -1,
                        ease: "none"
                    },
                    {
                        transform: 'translateX(0%)',
                        duration: 10,
                        repeat: -1,
                        ease: "none"
                    },
                )

                $("#strip .container div>img").addClass('reverse')
            }
        }



    });

}



function compareAmoled() {
    var img = $(".img-comp-overlay")
    var w = img.width()


    img.css({ width: w / 2 + 'px' })
    img.children("img").css({ width: w + 'px' })

    var slider = $("#amoled .slider")

    slider.css("left", w / 2 + 'px' )

    slider.on("mousedown touchstart", function (e) {
        e.preventDefault()
        $("#amoled").on("mousemove touchmove", sliderMove)
        slider.data("clicked", true);
    })
    slider.on("mouseup touchend", function (e) {
        e.preventDefault()
        $("#amoled").off("mousemove touchmove", sliderMove);
        slider.data("clicked", false);
    })
    $("#amoled .container").on("mouseleave", function(){
        slider.data("clicked", false);

    })

    function sliderMove(e) {
        if (!slider.data("clicked")) return;

        var pos = e.pageX - img.offset().left

        if (pos < 0) pos = 0;
        if (pos > w) pos = w;

        slider.css({ left: img.width() - slider.width() / 2 + "px" });
        img.css({ width: pos + "px" });


    }
}









stripAnim()
navAnimation()
showSlides()
topCategory()
compareAmoled()

