$(document).ready(function() {
    const imageWrapper = $("#image-wrapper"); 
    let prevPercentage = 0;
  
    $(window).mousedown(function(e) {
        imageWrapper.data("mouseDownAtPos", e.clientX);
    });

    $(window).mouseup(function() {
        imageWrapper.data("mouseDownAtPos", 0);
        prevPercentage = parseFloat(imageWrapper.data("percentage"));
      
    });

    $(window).mousemove(function(e) {
        if (parseFloat(imageWrapper.data("mouseDownAtPos")) === 0) return;

        const mouseDiff = parseFloat(imageWrapper.data("mouseDownAtPos") - e.clientX);
        const maxDiff = window.innerWidth / 2;

        const percentage = (mouseDiff / maxDiff) * -100; 
        const nextPercentageInfinite = prevPercentage + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageInfinite, 0), -100);

        imageWrapper.data("percentage", nextPercentage);
        imageWrapper.css("transform", `translate(${nextPercentage}%, -50%)`)
        
        $(".image", imageWrapper).each(function() {
            $(this).css("objectPosition", `${100 + nextPercentage}% center`);
        });   
    });
});