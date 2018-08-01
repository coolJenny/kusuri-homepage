$(document).ready(function() {  
 
  var owl1 = $("#owl-demo1"); 
  owl1.owlCarousel({
      items : 5, //5 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      navigation : true
  }); 


  var owl2 = $("#owl-demo2"); 
  owl2.owlCarousel({
      items : 6, //6 items above 1000px browser width
      itemsDesktop : [1000,5], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
      navigation : true,
      pagination: false
  });

  $('.owl-theme .owl-prev').html('<i class="fa fa-angle-left"></i>');
  $('.owl-theme .owl-next').html('<i class="fa fa-angle-right"></i>');
});