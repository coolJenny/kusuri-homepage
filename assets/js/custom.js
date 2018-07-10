$(document).ready(function(){
     //$('.main-content .container:eq(0)').prepend($('.ocexpert-newsletter-mod-holder').html());
     var newsletter_html = $('.ocexpert-newsletter-mod-holder').html();
     if ($('header #slider').length)
     {
     	$('header #slider').before('<div style="margin-top: 10px;" class="hidden-xs hidden-sm">'+newsletter_html+'</div>');
     	$('#slider .container-mobile').after('<div style="margin-top: 10px;" class="hidden-md hidden-lg">'+newsletter_html+'</div>');

     }
     else if($('header .pk-bnr_sp').length)
     {
      	$('header .pk-bnr_sp').before(newsletter_html);
     }
     else
     {
          $('header').after(newsletter_html);
     }

     $(document).on('click', '.ocexpert-newsletter-closed', function(e){
          $(this).removeClass('ocexpert-newsletter-closed');
          $('.ocexpert-newsletter-open').hide();
          $('.ocexpert-newsletter-close').show();
          $('.ocexpert-newsletter-mod-body-mob').show();
     })

     $(document).on('click', '.ocexpert-newsletter-close', function(e){
          $('.ocexpert-newsletter-mod-mob').addClass('ocexpert-newsletter-closed');
          $('.ocexpert-newsletter-mod-body-mob').hide();
          $('.ocexpert-newsletter-open').show();
          $('.ocexpert-newsletter-close').hide();
     })

     $(document).on('click', '.newsletter-input-wrapper', function(){
          $('.newsletter-input-radio').removeClass('active');
          $('.newsletter-input-radio input').prop('checked', false);
          $(this).find('.newsletter-input-radio input').prop('checked', true);
          $(this).find('.newsletter-input-radio').addClass('active');
     })

     $(document).on('click', '.newsletter-button', function(e){
          e.preventDefault();
          var form = $(this).closest('form');
          form.closest('.ocexpert-newsletter-wpr').removeClass('ocexpert-newsletter-has-success');
          form.closest('.ocexpert-newsletter-wpr').removeClass('ocexpert-newsletter-has-error');
          $.post(form.attr('action'), form.serializeArray(), function(r){
               try
               {
                    var j = $.parseJSON(r);
                    if(j.response == 'success')
                    {
                         form.closest('.ocexpert-newsletter-wpr').addClass('ocexpert-newsletter-has-success');
                         $('.newsletter-input-field').val('');
                    }
                    else
                    {
                         form.closest('.ocexpert-newsletter-wpr').addClass('ocexpert-newsletter-has-error');
                    }
               }
               catch(e)
               {

               }
          })
     })
     if($('.checkout-checkout #slider').css('display') == 'none'){
        $('.ocexpert-newsletter-wpr form').css('display','none');
        $('.ocexpert-newsletter-mod-mob').css({
            'min-height':'0',
            'margin':'0',
            'border':'none'
        });
        $('.ocexpert-newsletter-mod').css('border','none');
     }

    // 20160617 MT  arrow for go to pagetop  
    $(function(){
      var topBtn=$('#pageTop');
      topBtn.hide();
       
      $(window).scroll(function(){
           if($(this).scrollTop()>80){
                topBtn.fadeIn();
           }else{
                topBtn.fadeOut();
           } 
      });
       
      topBtn.click(function(){
        $('body,html').animate({scrollTop: 0},500);
        return false;
      });
    });

    // Monetrack   
    (function(d) {
      var scriptTrack = document.createElement('script');
      scriptTrack.src = 'https://assets.monetrack.com/scripts/track.js';
      scriptTrack.async = true;
      document.getElementsByTagName('head')[0].appendChild(scriptTrack);
    })(document);

    // Countdown settings
    var startDateTime = '';
    var endDateTime   = '2018/7/4 23:59:59';
    var text1 = 'タイムセール開催中！';
    var text2 = '残りあと';
    var link = '/sale_top/72時間平日タイムセール ?utm_source=timesale_banner&utm_campaign=timesale_courter';
    var text3 = '詳細はこちら';

    if(startDateTime == ''){
      var date = new Date();
      startDateTime = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
      ].join( '/' ) + ' '
      + date.toLocaleTimeString();
    }
    // Show countdown area other than the period
    start = new Date(startDateTime);
    end = new Date(endDateTime);
    now = new Date();
    if((now >= start) && (now < end)){
      $(".countdown #cd-text").text(text1);
      $(".countdown #timer span").text(text2);
      $(".countdown #cd-link a").attr('href', link);
      $(".countdown #cd-link a span").text(text3);
      $('.countdown').css('display','block');
      $("#timer").yycountdown({
        startDateTime : startDateTime,
        endDateTime   : endDateTime,
        unit          : {d: '日', h: '時間', m: '分', s: '秒'},
        complete      : function(_this){
                  _this.find('.yycountdown-box').fadeOut();
                  $('.countdown').css('display','none');
                }
      });
    }

  $("#dol-custom-modal").detach().appendTo($('body'));    
  $('#dol-custom-modal').on('shown.bs.modal', function (e) {
    $(".modal-backdrop").detach().appendTo($('body'));
  })

  var uri = location.pathname + location.search;
  var documentReady = false;
  var windowLoad = false;
  var isBodyClicked = false;
  var delay = 500;
  var timeout = 1000;
  var product_id = '0';
  
  $(document).ready(function() {
    documentReady = true;
  });
  
  $(window).load(function() {
    windowLoad = true;
  });
  
  $.ajax({
    url: '//www.kusuriexpress.com/index.php?route=module/smartnotifications/getPopup',
    type: 'POST',
    data: {'uri' : uri, product_id:product_id},
    dataType: 'json',
    success: function (response) {
      for(entry in response) {
    
        if(response[entry].match) {
          repeat = response[entry].repeat;
          popup_id = response[entry].id;

          if(response[entry].delay>0) {
            delay += (response[entry].delay*1000);
          }

          if(response[entry].timeout>0) {
            timeout += (response[entry].timeout*1000);
          } else {
            timeout = false;
          }

          if(response[entry].event == 0) { // Document ready event      
            if (documentReady) {    
              showSmartNotificationsPopup(response[entry].popup_id, response[entry].title, response[entry].description, response[entry].template, response[entry].icon, response[entry].position, response[entry].open_animation, response[entry].close_animation,response[entry].show_icon,response[entry].icon_type,response[entry].icon_image);
            } else {
              $(document).ready(function(){   
                showSmartNotificationsPopup(response[entry].popup_id, response[entry].title, response[entry].description, response[entry].template, response[entry].icon, response[entry].position, response[entry].open_animation, response[entry].close_animation,response[entry].show_icon,response[entry].icon_type,response[entry].icon_image);
              });
            }
          }
          
          
          if(response[entry].event == 1) { // Window load event

            if(windowLoad) {

              showSmartNotificationsPopup(response[entry].popup_id, response[entry].title, response[entry].description, response[entry].template, response[entry].icon, response[entry].position, response[entry].open_animation, response[entry].close_animation,response[entry].show_icon,response[entry].icon_type,response[entry].icon_image);
            }
            else {
              $(window).load(function() {
                showSmartNotificationsPopup(response[entry].popup_id, response[entry].title, response[entry].description, response[entry].template, response[entry].icon, response[entry].position, response[entry].open_animation, response[entry].close_animation,response[entry].show_icon,response[entry].icon_type,response[entry].icon_image);
              });
            }
           
          }
         
          if(response[entry].event == 2) { // Body click event
            $('body').click(function() {
              if(isBodyClicked == false) {
                showSmartNotificationsPopup(response[entry].popup_id, response[entry].title, response[entry].description, response[entry].template, response[entry].icon, response[entry].position, response[entry].open_animation, response[entry].close_animation, response[entry].show_icon,response[entry].icon_type,response[entry].icon_image);
                isBodyClicked = true;
              } 
            });
          }

          }

      }
      
    }
  });
  
  var showSmartNotificationsPopup = function (popup_id, title, description, template, icon, position,open_animation,close_animation, show_icon,typeOfIcon,image) {
    setTimeout(function() {     
      var layout;
      if (show_icon==1 && typeOfIcon == 'p' ) {
        layout =  '<div class="noty_message pop-activity ' + template + '"><div class="icon"><i class="fa ' + icon + '"></i></div><div class="noty_text"></div><div class="noty_close">test</div></div>'
      } else if (show_icon == 1 && typeOfIcon == 'u'){
        layout = '<div class="noty_message pop-activity ' + template + '"><div class="image"><img src="'+image+'"></div><div class="noty_text"></div><div class="noty_close">test</div></div>'
      } else  {
        layout =  '<div class="noty_message pop-activity ' + template + '"><div class="noty_text"></div><div class="noty_close">test</div></div>'
      }   

      var n = noty({
                text        : '<h3>' + title + '</h3><p>' + description + '</p>',
                dismissQueue: true,
                layout      : position,
                closeWith   : ['click'],
                theme   : 'smartNotifications',
                timeout   : timeout,
                template  : layout,
                maxVisible  : 10,
                animation   : {
                    open  : 'animated '+open_animation,
                    close : 'animated '+close_animation,
                    easing: 'swing',
                    speed : 1500
                }
            });             
    }, delay);    
  };


  var owl12401883 = $(".box #myCarousel12401883 .carousel-inner");  
  $("#myCarousel12401883_next").click(function(){
      owl12401883.trigger('owl.next');
      return false;
    })
  $("#myCarousel12401883_prev").click(function(){
      owl12401883.trigger('owl.prev');
      return false;
  });    
  owl12401883.owlCarousel({slideSpeed : 500, singleItem:true, });


  var camera_slider = $("#camera_wrap_1");                     
  camera_slider.owlCarousel({
      slideSpeed : 300,
      lazyLoad : true,
      singleItem: true,
      autoPlay: 6000,
      stopOnHover: true,
      navigation: true,
              navigationText: false
  });
  $(window).load(function() { 
      $("#camera_1 .spinner").fadeOut(200);
      $("#camera_wrap_1").css("height", "auto");
  });


  var uri = location.pathname + location.search;
  var bootstrap_enabled = (typeof $().modal == 'function');
  if (!bootstrap_enabled) {
      $('head').append('<link rel="stylesheet" type="text/css" href="https://static.kusuriexpress.com/catalog/view/javascript/discountonleave/modal/dol_bootstrap.min.css" />');
      $('head').append('<script type="text/javascript" src="https://static.kusuriexpress.com/catalog/view/javascript/discountonleave/modal/dol_bootstrap.min.js"><'+'/script>');
  }
  var prevY = -1;
  var start_time = new Date();
  var showed = false;
  $(document).bind("mouseout", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if(prevY == -1) {
        prevY = e.pageY;
        return;    
    }
    if ((e.pageY<prevY) && (e.pageY - $(window).scrollTop() <= 1)) {
      $.ajax({
        url: '//www.kusuriexpress.com/index.php?route=module/discountonleave/getPopup',
        type: 'GET',
        data: {'uri' : uri},
        dataType: 'json',
        success: function (response) {
          var dol_title = $('#dol-custom-modal .modal-title');
          var dol_body = $('#dol-custom-modal .modal-body');
          var dol_dialog = $('#dol-custom-modal .modal-dialog');

          if(response.match) {
            dol_title.html(response.title);
            dol_body.html(response.content);
            dol_dialog.css("width",response.width);
            dol_dialog.css("height",response.height);
            dol_dialog.css("position","fixed");
            var marginTop = -response.height/2;
            var marginLeft = -response.width/2;
            dol_dialog.attr('id', 'dl-custom-popup-'+response.popup_id);
            switch(response.position) {
              case "0": 
                dol_dialog.css("top",'50%');
                dol_dialog.css("left",'50%');
                dol_dialog.css("margin-top",marginTop);
                dol_dialog.css("margin-left",marginLeft);
                dol_dialog.addClass('animated bounceInDown');
                break;
              case "1": 
                dol_dialog.css("top",'2%');
                dol_dialog.css("left",'2%');
                dol_dialog.addClass('animated bounceInLeft');
                break;
              case "2": 
                dol_dialog.css("top",'2%');
                dol_dialog.css("right",'2%');
                dol_dialog.addClass('animated bounceInRight');
                break;
              case "3": 
                dol_dialog.css("bottom",'2%');
                dol_dialog.css("left",'2%');
                dol_dialog.addClass('animated bounceInLeft');
                break;
              case "4": 
                dol_dialog.css("bottom",'2%');
                dol_dialog.css("right",'2%');
                dol_dialog.addClass('animated bounceInRight');
                break;
              case "5": 
                dol_dialog.css("top",'2%');
                dol_dialog.css("left",'50%');
                dol_dialog.css("margin-left",marginLeft);
                dol_dialog.addClass('animated bounceInDown');
                break;
              case "6": 
                dol_dialog.css("bottom",'2%');
                dol_dialog.css("left",'50%');
                dol_dialog.css("margin-left",marginLeft);
                dol_dialog.addClass('animated bounceInUp');
                break;
              default: break;
            }
            if(response.preventclose == "1") {
              $('#dol-custom-modal').modal({
                backdrop: 'static',
                keyboard: false
              });
            }

            function getSecondsAfterExit(){
               var end_time = new Date();
               var elapsed_ms = end_time - start_time;
               var sec = Math.round(elapsed_ms / 1000);
               return sec;
            }

            if(!showed){

              if(response.seconds){
                
                if(response.seconds <= getSecondsAfterExit()){
                  
                  $('#dol-custom-modal').modal('show');
                }

              } else {
                $('#dol-custom-modal').modal('show');
              }

              $('#dol-custom-modal').on('hidden.bs.modal click', function (e) {
                showed = true;
                  $.ajax({                    
                    url: '//www.kusuriexpress.com/index.php?route=module/discountonleave/setSession',
                  type: 'GET',
                  data: {'popup_id' : response.popup_id},
                  success: function() {
                    /* Silence */
                  }
                });
              });

            }             
          }
        }
      });
      prevY = -1;
    } else {
       prevY = e.pageY;
    }
  });


});