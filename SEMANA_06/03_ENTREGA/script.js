// Function to create the dark mode animation, reference from youtube channel DesignTorch
$(document).ready(function() {
    $(".radio-btn").click(function() {
        $(".radio-inner").toggleClass("active")
        $("body").toggleClass("dark")
        $(".row-right").toggleClass("dark")
        $(".row-left").toggleClass("dark")
    })
})

// Function to create the Image Slider, reference from youtube channel Traversy Media
$(document).ready(function(){
    $('.next').on('click', function(){
        var currentImg = $('.active');
        var nextImg = currentImg.next();

        if(nextImg.length){
            currentImg.removeClass('active').css('z-index', -10);
            nextImg.addClass('active').css('z-index', 10)
        }
    })

    $('.prev').on('click', function(){
        var currentImg = $('.active');
        var prevImg = currentImg.prev();

        if(prevImg.length){
            currentImg.removeClass('active').css('z-index', -10);
            prevImg.addClass('active').css('z-index', 10)
        }
    })
})