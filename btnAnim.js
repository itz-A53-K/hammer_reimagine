function btnAnimations() {

    //btn animation 1
    
    $(".btn1").each(function() {
        
        var btn= $(this)

        btn.html(btn.html() + '<div class="btnbg"></div>')
        
        var tl = gsap.timeline({ paused: true })
        tl.to(btn, {
            '--beforeLeft': '50%',
            '--afterLeft': '50%',
            "--opacity": 1,
            duration: 0.2,
        })
    
        tl.to(btn.children('.btnbg'), {
            scale: 1,
            opacity: 1,
            duration: 0.15,
        }, 'a')
        tl.to(btn, {
            color: 'white',
            gap: '1rem',
            duration: 0.15,
        }, 'a') 

    
        $(btn).hover(
            function () {
                tl.play()
            },
            function () {
                tl.reverse()
            }
        )
    })



    //btn animation 2
    $(".btn2").each(function() {
        
        var btn= $(this)        
        
        var tl = gsap.timeline({ paused: true })

        tl.set(btn,{
            "background-color":"transparent",
        })
        
        tl.to(btn, {
            '--rot': '360deg',
            color: 'white',
            duration: 0.5,
        })
        tl.to(btn, {
            '--rot': '360deg',
            color: 'white',
            duration: 0.5,
        })

        $(btn).hover(
            function () {
                tl.play()
            },
            function () {
                tl.reverse()
            }
        )
    })




    
}



btnAnimations()