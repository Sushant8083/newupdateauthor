var video = document.querySelector("#videocontainer");


gsap.delayedCall(36, function() {
    gsap.to('#videocontainer', {
        duration: 2,
        top: "-200%",
        ease: "expo.in"
    });
});


setInterval(function(){
    document.querySelector("#main").style.display = "block";
},36700 )