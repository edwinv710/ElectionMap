(function($) {

    $.fn.sliders = function( options, callback ) {

        var settings = $.extend({
            max: 10,
            min: 0
        }, options);
      
       var elements = this;

        return this.each(function(index) {
          var value = parseInt($(this).data("value") || 0);
          $(this).slider({
            range: "min",
            value: value,
            min: settings.min,
            max: settings.max,
            slide: function(event, ui) {
              var sum = 0;
              $(elements).not(this).each(function(){
                sum = sum + parseInt($(this).data("value"));
              });
              var available = settings.max - sum - ui.value;             
              if (available < 0) {return false;}
              $(this).data("value", ui.value);
              if(typeof callback == "function"){ callback(this, ui.value, available) } 
            }
          });
        });
    }
}(jQuery));
