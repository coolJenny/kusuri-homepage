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
});