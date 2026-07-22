
// =====================
// Scroll Fade Animation
// =====================


const targets = document.querySelectorAll(
    ".section, .card, .gallery-grid img"
);



const observer = new IntersectionObserver(
(entries)=>{

    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


},
{
    threshold:0.15
});



targets.forEach(target=>{

    target.classList.add("fade");

    observer.observe(target);

});






// =====================
// Header Scroll Effect
// =====================


const header = document.querySelector(".header");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 50){

        header.style.background =
        "rgba(0,0,0,0.95)";

    }else{

        header.style.background =
        "rgba(0,0,0,0.7)";

    }


});






// =====================
// Smooth Scroll
// =====================


document.querySelectorAll(
    'a[href^="#"]'
)
.forEach(anchor=>{


    anchor.addEventListener(
    "click",
    function(e){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});