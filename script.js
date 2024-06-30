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

loaderAnimation()
window.onload = function () {

    setTimeout(() => {
        
        gsap.to("#loader", {
            y: "-100%",
        })

    }, 10);

}

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

    var tl_menuSM = gsap.timeline({ paused: true })

    tl_menuSM.to("nav .menu-sm", {
        right: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'ease.inOut'
    })
    tl_menuSM.from("nav .menu-sm .contTop i", {
        opacity: 0,
        delay: 0.2,
        duration: 0.2,
        stagger: 0.1
    })
    tl_menuSM.from("nav .menu-sm .navLink h1", {
        rotate: '50deg',
        y: '100%',
        opacity: 0,
        duration: 0.2,
        stagger: 0.1
    })

    $("#hamburger").click(function () {
        tl_menuSM.play()
    })
    $("nav .menu-sm .close-menu-sm").click(function () {
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

    var x = window.matchMedia("(max-width: 900px)")
    if (x.matches) {
        var minusV = 1
    } else {
        var minusV = 2
    }


    gsap.to(cardCont, {
        x: -(cardCont.length - minusV) * 100 + '%',

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

    gsap.to("#strip .container", {
        x: "-100%",
        duration: 10,
        repeat: -1,
        ease: "none"
    })
   
}


function compareAmoled() {
    var img = $(".img-comp-overlay")
    var w = img.width()


    img.css({ width: w / 2 + 'px' })
    img.children("img").css({ width: w + 'px' })

    var slider = $("#amoled .slider")

    slider.css("left", w / 2 + 'px')

    slider.on("mousedown touchstart", function (e) {
        e.preventDefault()
        $("#amoled").on("mousemove", sliderMove)
        $("#amoled").on("touchmove", sliderMove)
        slider.data("clicked", true);
    })

    slider.on("mouseup touchend", function (e) {
        e.preventDefault()
        $("#amoled").off("mousemove", sliderMove);
        $("#amoled").off("touchmove", sliderMove);
        slider.data("clicked", false);
    })

    $("#amoled .container").on("mouseleave", function () {
        slider.data("clicked", false);

    })

    function sliderMove(e) {
        if (!slider.data("clicked")) return;

        var pos = (e.pageX - img.offset().left) || (e.touches[0].clientX - img.offset().left)

        if (pos < 0) pos = 0;
        if (pos > w) pos = w;

        slider.css({ left: img.width() - slider.width() / 2 + "px" });
        img.css({ width: pos + "px" });
    }
}


function populate_fCollection() {

    var cardData = [
        // {
        //     "imgUrl": "ArcticSmartwatch.webp",
        //     "pName": "arctic",
        //     "price": '8,999',
        //     "dPrice": '2,499',
        //     "colors": ["#b99e61","#393c48","black"],
        //     "desc": '2.04" Super Amoled | BT Calling'
        // },
        {
            "imgUrl": "steller_Earbuds.webp",
            "pName": "stellar",
            "price": '5,999',
            "dPrice": '1,599',
            "colors": ["#e1d9d3"],
            "desc": 'ENC + Quad Mics'
        },
        // {
        //     "imgUrl": "Screen_TWS_Earbuds.webp",
        //     "pName": "screen tws",
        //     "price": '8,999',
        //     "dPrice": '2,799',
        //     "colors": ["#fff"],
        //     "desc": 'ANC + ENC | Touch Screen'
        // },
        {
            "imgUrl": "BluetoothNeckbands.webp",
            "pName": "splendor",
            "price": '2,499',
            "dPrice": '699',
            "colors": ["#000"],
            "desc": 'Bluetooth Neckbands'
        },
        {
            "imgUrl": "CycloneSmartwatch.webp",
            "pName": "cyclone",
            "price": '5,999',
            "dPrice": '1,599',
            "colors": ["#eec3b2", "black", "#252b3b", "#ccd0d1"],
            "desc": '1.39" Screen | BT Calling'
        },

        {
            "imgUrl": "blaze_GamingHeaphone.webp",
            "pName": "blaze",
            "price": '8,999',
            "dPrice": '2,499',
            "colors": ["#111", "gray"],
            "desc": '50mm Drivers | RGB Lights'
        },
        {
            "imgUrl": "soundbar.webp",
            "pName": "beatbox",
            "price": '5,999',
            "dPrice": '1,599',
            "colors": ["#111"],
            "desc": '24W Output | 8 Hours Playtime'
        },
    ]

    cardData.forEach((data) => {
        var allColor = ''
        data.colors.forEach((color) => {
            allColor += `<span style="--color: ${color};"></span>`
        })
        var card = `<div class="card">
                    <img src="img/fCollection/${data.imgUrl}" alt="${data.imgUrl}">

                    <h2 class="pName">${data.pName}</h2>
                    <div><span class="dPrice">Rs. ${data.dPrice}.00</span> <span class="price">Rs. ${data.price}.00</span></div>
                    <div class="colors"> ${allColor}</div>
                    <h4 class="desc">${data.desc}</h4>

                    <button class="buyBtn btn2">Grab Now</button>
                </div>`

        $("#collection .container").append(card)
    })
    $("#collection .container").append(`<div class="card cardV"><h2>View All</h2><i class="ri-arrow-right-fill"></i></div>`)
}

function loaderAnimation() {
    gsap.to("#loader h2 span", {
        y: 0,
        opacity: 1,
        duration: 0.4
    })


    var tl = gsap.timeline({
        repeat: -1,
        duration: 0.8,
    })
    tl.to("#loader .loadDot span", {
        opacity: 1,
        stagger: 0.2,
        y: "0%",
        x: "0%",
    })
    tl.to("#loader .loadDot span", {
        opacity: 0,
        stagger: 0.2,
        x: "-500%",
        y: "50%",
    })


    gsap.to("#loader div h3", {
        scale: 1,
        delay: 1,
        duration: 0.5,
        stagger: 0.5,
        repeat: -1,
        repeatDelay: 0.5
    })

}








stripAnim()
navAnimation()
showSlides()
topCategory()
compareAmoled()
populate_fCollection()







// function stripDirectionControlOnScroll() {


//     var play = revplay = false
    
//     $(window).on('wheel', function (dets) {
//         var deltaY = dets.originalEvent.deltaY
//         animationController(deltaY)
//     });
//     // var lastY = null
//     // $(window).on('touchmove', function (dets) {
//     //     const currentY = dets.originalEvent.changedTouches[0].clientY;

//     //     if (lastY !== null) {
//     //         const deltaY = currentY - lastY;
//     //         animationController(deltaY)
//     //     }
//     //     lastY = currentY        
//     // });

//     function animationController(deltaY) {

//         if (deltaY > 0 && !play) {
//             play = true
//             revplay = false
//             gsap.fromTo("#strip .container",
//                 {
//                     transform: 'translateX(0%)',
//                     duration: 10,
//                     repeat: -1,
//                     ease: "none"
//                 },
//                 {
//                     transform: 'translateX(-100%)',
//                     duration: 10,
//                     repeat: -1,
//                     ease: "none"
//                 },
//             )
//             $("#strip .container div>img").removeClass('reverse')
//         }
//         else {
//             if (revplay == false) {
//                 revplay = true
//                 play = false
//                 gsap.fromTo("#strip .container",
//                     {
//                         transform: 'translateX(-100%)',
//                         duration: 10,
//                         repeat: -1,
//                         ease: "none"
//                     },
//                     {
//                         transform: 'translateX(0%)',
//                         duration: 10,
//                         repeat: -1,
//                         ease: "none"
//                     },
//                 )

//                 $("#strip .container div>img").addClass('reverse')
//             }
//         }
//     }
// }