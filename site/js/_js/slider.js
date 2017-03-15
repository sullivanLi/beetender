(function($) {
  var $lis,
      index = 0,
      $indicators,
      interval,
      $navBtns;
  
  function slider() {
    if (index >= $lis.length) {index = 0}
    changeSlider();
    index++;
    interval = setTimeout(slider, 6000);
  }
  
  function changeSlider() {
    $lis.removeClass('active');
    $indicators.removeClass('active');
    $($lis[index]).addClass('active');
    $($indicators[index]).addClass('active');
  }
  
  function onIndicatorsClick(e) {
    clearInterval(interval);
    index = $(e.target).data('index');
    console.log(e.target);
    slider();
  }
  
  function binding() {
    $indicators.on('click', onIndicatorsClick);
    $navBtns.on('click', onIndicatorsClick);
  }
  
  $(document).ready(function() {
    $lis = $('.slider li');
    $indicators = $('.slider .indicator');
    $navBtns = $('nav .nav-btn');
    slider();
    binding();
  });
})(jQuery);