/**
 * jquery.geeklistwidget.js 
 * A widget for your website to show off you awesomeness.
 * 
 * Changelog
 * 
 * 1.0 - 2011/09/23 - initial release
 * 
 */
(function($) {
    $.geeklistwidget = function(options) {
        var settings = {
            //id of the HTML-element which helds the widget
            htmlId: 'geeklistwidget',
            cssUrl: 'jquery.geeklistwidget.css',
            geeklistUrl: 'http://geekli.st/users/###username###.json',
            log: true
        };
        
        options = $.extend(true, settings, options);
        
        var version = '1.0.0';
        
        
        function prepareStyles(){
            log("Adding styles to the document");
            $('head').append('<link rel="stylesheet" href="'+options.cssUrl+'" type="text/css" />');
        }
        
        /**
         * build the url the user info can be fetched from
         */ 
        function buildUserUrl(username){
            log("Building url for user :"+username);
            return options.geeklistUrl.replace('###username###',username);
        }
        
        /**
         * fetch the user info from geeklist
         */ 
        function fetchUserInfo(){
            
            userUrl = buildUserUrl(options.username);
            
            log("Fetching user info from '"+userUrl+"'");
            
            $.getJSON(userUrl, function(data) {
                log("Received result from user url.");
                console.log(data);                
            });
        }
        
        /**
         * fall back if CSS3-rotation isn't possible (non-webkit)
         */ 
        function rotateSpinner(){
            
            var count = 0;
            
            function rotate() {
                
                if($('#'+options.spinnerId).length == 0){
                    //no spinner found
                    return;   
                }
                
                var elem = document.getElementById(options.spinnerId);
                elem.style.MozTransform = 'scale(0.5) rotate(' + count + 'deg)';
                elem.style.WebkitTransform = 'scale(0.5) rotate(' + count + 'deg)';
                if (count == 360) {
                    count = 0
                }
                count += 45;
                window.setTimeout(rotate, 100);
            }
            window.setTimeout(rotate, 100);     
        }
        
        /**
         * a simple log wrapper to switch logging on/off and avoid js-errors on non-console browsers (looking at you IE!)
         */ 
        function log(message){
            if(options.log && typeof console == "object" && typeof console.log == "function"){
                console.log(message);   
            }
        }
        
        /**
         * make sure we can work with this config
         */ 
        function checkConfig(){
            error_message = '';
            
            if( typeof options.username == "undefined" || options.username.length == 0){
                error_message = 'GeeklistWidget: Please configure your geeklist username. See manual for details';
            }
            
            if(error_message.length > 0){
                alert(error_message);   
            }
        }
        
        function run(){
            prepareStyles();
            fetchUserInfo();
        }
        
        log("Starting jquery.geeklistwidget [version="+options.version+"]");
        log("Options:");
        log(options);
        
        //build the widget
        run();
                
    };
})(jQuery);