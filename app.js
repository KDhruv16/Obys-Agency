let tl = gsap.timeline();  
function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loaderAnimation() {
    let h2 = document.querySelector("#time");
    tl.from("#line h1",{
    duration: 1,
    y: 300,
    opacity:0,
    ease: "power4",
    stagger: 0.3,
    
})

tl.from("#timer",{
    duration: 1,
    x: -300,
    opacity:0,
    ease: "power4",
    // stagger: 0.3,
    onStart: function timer(){
    let count = 0 ;
    let timer =  setInterval(()=>{
        if(count <= 100){
        h2.innerHTML = count++;
        }else{
            clearInterval(timer);
        }
        // console.log(h2);
    },30)
}
})
tl.to("#loader", {
  opacity: 0,
  duration: 0.2,
  delay: 2.5,
})
.to("#loader", {
  display: "none"
})
.from("#page1", {
  y: 400,
  opacity: 0,
  duration: 0.5,
  ease: "power4"
});
tl.from("#hero h1",{
    duration: 1,
    y: 50,
    opacity:0,
    ease: "power4",
    stagger: 0.3,
})
// tl.from("#page3", {
//     duration: 1,
//     x: -300,
//     opacity: 0,
//     ease: "power4.elastic",
//     scrollTrigger: {
//         trigger: "#page3",
//         scroller: "#main",     
//         start: "top 80%",       
//         end: "top 20%",  
//         markers: true,
//     }
// });
// tl.from("#page4", {
//     duration: 1,
//     y: 700,
//     opacity: 0,
//     ease: "power4.elastic",
//     scrollTrigger: {
//         trigger: "#page4",
//         scroller: "#main",  
//         start: "top 50%",       
//         end: "top 20%",  
//     }
// });

}
loaderAnimation()
function cursor(){
    Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});
Shery.makeMagnet("#nav3 h3")
}

cursor()
locomotiveAnimation()

function sheryAnimation() {
    Shery.imageEffect(".img-div", {
        style: 5,
        gooey: true,
        debug: false,
    });
}
sheryAnimation()

function videoCusror(){
    let videoCon = document.querySelector("#video-container");
let videoCur = document.querySelector("#video-cursor");
let cur = document.querySelector(".mousefollower");

videoCon.addEventListener("mouseenter", () => {
    console.log("hello");
    videoCon.addEventListener("mousemove", (event) => {
        console.log("hii");
        gsap.to(".mousefollower", {
            opacity :0
        })
        gsap.to("#video-cursor", {
            left: event.x - 370,
            y: event.y - 220  ,
            // duration: 0.5,
            // ease: "power4",
            // // stagger: 0.3,
        })
    })
})
videoCon.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", { opacity: 1, delay: 0.2 });
    gsap.to("#video-cursor", {
        left: "68%",  // or the pixel value where it should start
        y: "0%",      // or 0px if you want top
        duration: 0.5,
        ease: "power2.out"
    });
});


let video = document.querySelector("#video");
let img = document.querySelector("#videoImg");
let icon = document.querySelector("i");
videoCon.addEventListener("click", () => {
    if(video.paused){
    video.play();
    img.style.opacity = "0";
        icon.classList.add("ri-pause-line");
        icon.classList.remove("ri-play-mini-fill");
        gsap.to("#video-cursor", {
        width: "8vw",
        height: "8vw",
        // duration: 0.5,
        ease: "power4",
        // // stagger: 0.3,
    })
    }
    else{
    video.pause();
    img.style.opacity = "1";
     icon.classList.remove("ri-pause-line");
    icon.classList.add("ri-play-mini-fill");
    gsap.to("#video-cursor", {
        width: "12vw",
        height: "12vw",
        // duration: 0.5,
        ease: "power4",
        // // stagger: 0.3,
    })
    }
})
}

videoCusror();

function flagAnimation(){
let hero = document.querySelector("#hero3");
let flag = document.querySelector("#flag");
hero.addEventListener("mouseenter", () => {
    console.log("hii");
    hero.addEventListener("mousemove", (event) => {
        console.log("h");
        console.log(event.x);
        gsap.to("#flag", {
            left : event.x,
            top : event.y,
            opacity:1
        })
    })
})
hero.addEventListener("mouseleave", () => {
    gsap.to("#flag", {
        opacity:0
    })
})
}

flagAnimation();


function textillateAnimation(){
    const textEl = document.querySelector("#texth1");

textEl.addEventListener("mouseenter", () => {
    // Change font to silk italic, uppercase, and hollow
    textEl.style.fontFamily = "silk itallic";
    textEl.style.textTransform = "uppercase";
    textEl.style.color = "transparent";                // make text hollow
    textEl.style.fontWeight = "400";                // make text hollow
    textEl.style.webkitTextStroke = "1px white";       // stroke color

    // GSAP animation
    gsap.fromTo(
        "textEl",
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }
    );

    // Optional: Textillate in effect
    $('#text').textillate({ 
        in: { effect: 'fadeInLeft' },
        out: { effect: 'fadeOutRight' }
    });
});

textEl.addEventListener("mouseleave", () => {
    // Revert font to plain light
    textEl.style.fontFamily = "plain light";
    textEl.style.textTransform = "uppercase"; // keep uppercase if you want
    textEl.style.color = "white";              // fill text color back
    textEl.style.webkitTextStroke = "1px";     // remove stroke
});
}
textillateAnimation();