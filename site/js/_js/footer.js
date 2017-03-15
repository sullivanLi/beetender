(function($) {
  var $images;
  
  function onImagesClick(e) {
    $('body,html').animate({
          scrollTop: $('.feature').offset().top
      }, 500);
  }
  
  function binding() {
    $images.on('click', onImagesClick);
  }
  
  $(document).ready(function() {
    $images = $('footer img');
    binding();
  });
})(jQuery);