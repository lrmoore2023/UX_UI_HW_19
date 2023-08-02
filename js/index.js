$(document).ready(function() {
    const imageWrapper = $("#image-wrapper"); 
    let prevPercentage = 0;

    $(window).on("click", function(){
        console.log("Mouse clicked")
    });
  
    $(window).mousedown(function(e) {
        /*Store mouse position */
        imageWrapper.data("mouseDownAtPos", e.clientX);
    });

    $(window).mouseup(function() {
        /*Reset mouse down pos to 0 */
        imageWrapper.data("mouseDownAtPos", 0);
        prevPercentage = parseFloat(imageWrapper.data("percentage"));
      
    });

    $(window).mousemove(function(e) {
        if (parseFloat(imageWrapper.data("mouseDownAtPos")) === 0) return;

        const mouseDiff = parseFloat(imageWrapper.data("mouseDownAtPos") - e.clientX);
        const maxDiff = window.innerWidth / 2;

        /*Calculate percentage based on existing diff + maxdiff */
        const percentage = (mouseDiff / maxDiff) * -100; 
        const nextPercentageInfinite = prevPercentage + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageInfinite, 0), -100);

        /*Move images based on slider */
        imageWrapper.data("percentage", nextPercentage);
        imageWrapper.css("transform", `translate(${nextPercentage}%, -50%)`)
        
        /*Slide/update image for parallax */
        $(".image", imageWrapper).each(function() {
            $(this).css("objectPosition", `${100 + nextPercentage}% center`);
        });   
    });
});