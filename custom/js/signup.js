$(document).ready(function() {
    $(function(){
      
      var animationLibrary = 'animate';
      
      $.easing.easeOutQuart = function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
      };
      $('[ripple]:not([disabled],.disabled)')
      .on('mousedown', function( e ){
        
        var button = $(this);
        var touch = $('<touch><touch/>');
        var size = button.outerWidth() * 1.8;
        var complete = false;
        
        $(document)
        .on('mouseup',function(){
          var a = {
            'opacity': '0'
          };
          if( complete === true ){
            size = size * 1.33;
            $.extend(a, {
              'height': size + 'px',
              'width': size + 'px',
              'margin-top': -(size)/2 + 'px',
              'margin-left': -(size)/2 + 'px'
            });
          }
            
          touch
          [animationLibrary](a, {
            duration: 500,
            complete: function(){touch.remove();},
            easing: 'swing'
          });
        });
        
        touch
        .addClass( 'touch' )
        .css({
          'position': 'absolute',
          'top': e.pageY-button.offset().top + 'px',
          'left': e.pageX-button.offset().left + 'px',
          'width': '0',
          'height': '0'
        });
        
        /* IE8 will not appendChild */
        button.get(0).appendChild(touch.get(0));
        
        touch
        [animationLibrary]({
          'height': size + 'px',
          'width': size + 'px',
          'margin-top': -(size)/2 + 'px',
          'margin-left': -(size)/2 + 'px'
        }, {
          queue: false,
          duration: 500,
          'easing': 'easeOutQuart',
          'complete': function(){
            complete = true
          }
        });
      });
    });
    
    var username = $('#username'), 
        password = $('#password'), 
        erroru = $('erroru'), 
        errorp = $('errorp'), 
        submit = $('#submit'),
        udiv = $('#u'),
        pdiv = $('#p');
    
    username.blur(function() {
      if (username.val() == '') {
        udiv.attr('errr','');
      } else {
        udiv.removeAttr('errr');
      }
    });
    
    password.blur(function() {
    if(password.val() == '') {
        pdiv.attr('errr','');
      } else {
        pdiv.removeAttr('errr');
      }
    });
    
    
    /* Animation on logo click */
    $('#click-logo').on('click', function(event) {
      $( ".card-avatar img" ).addClass("spin-lg");
      setTimeout(function(){
          $( ".card-avatar img" ).removeClass("spin-lg");
        }, 600);
    });
    

    /* Submit button click event */
    submit.on('click', function(event) {
        event.preventDefault();

        /* Spin animation on logo */
        $( ".card-avatar img" ).addClass("spin");

        /* Call function to animate thunder effects */
        animateThunder();

        /* Remmove spin class (this will make spin animation reusable) */
        setTimeout(function(){
            $( ".card-avatar img" ).removeClass("spin");
        }, 600);

        /* Show error handlers for input fields */
        if (username.val() == '') {
            udiv.attr('errr','');
        } else {
            udiv.removeAttr('errr');
        } 
        if(password.val() == '') {
            pdiv.attr('errr','');
        } else {
            pdiv.removeAttr('errr');
        }
    });
}); /* End document(Ready) */


    function animateThunder(){
        $( ".card" ).addClass("card-clicked");
        /* Change opacity of a background */
        $( ".thunder1" ).animate({
            opacity: 1,
            /* left: "+=20%", */
          }, 20, function() {
            // Animation complete.
            $( ".thunder1" ).css("opacity",0);
            /* $( ".clouds" ).css("opacity",0.8); */
            $( ".clouds" ).css("z-index",-5);
              $( ".thunder1" ).animate({
              opacity: 1,
              /* left: "+=20%", */
            }, 200, function() {
              // Animation complete.
              $( ".thunder1" ).css("opacity",0);
              $( ".clouds" ).css("z-index",-20);
              $( ".card" ).removeClass("card-clicked");
                $( ".thunder1" ).animate({
                opacity: 1,
                /* left: "+=20%", */
              }, 100, function() {
                // Animation complete.
                $( ".thunder1" ).css("opacity",0);
              });
              
            });
          });
      
            /* Change opacity of a background */
            $( ".thunder2" ).animate({
            opacity: 1,
            /* left: "+=20%", */
          }, 50, function() {
            // Animation complete.
            $( ".thunder2" ).css("opacity",0);
              $( ".thunder2" ).animate({
              opacity: 1,
              /* left: "+=20%", */
            }, 250, function() {
              // Animation complete.
              $( ".thunder2" ).css("opacity",0);
            });
          });
    }

    