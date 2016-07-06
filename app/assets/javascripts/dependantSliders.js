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
            animate: "slow",
            slide: function(event, ui) {
              var sum = 0;
              var value = ui.value;
              $(elements).not(this).each(function(){
                sum = sum + parseInt($(this).data("value"));
              });
              var available = settings.max - sum - value;             
              if (available < 0) {
                var value = value + available;
                $(this).slider({value: value, animate: "slow"});
              }
              $(this).data("value", value);
              if(typeof callback == "function"){ callback(this, value, available) } 
              if(available < 0) return false;
            }
          });
        });
    }
}(jQuery));
