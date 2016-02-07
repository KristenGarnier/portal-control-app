var Hammer = require('hammerjs');

module.exports = function(){
    var touchEvents = new Hammer(document.body);
    console.log(touchEvents);

    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.querySelector('#switch').addEventListener('click', function () {
        this.changeView();
    }.bind(this), false);

    $('body').on('request-success', this.successfull);
    $('body').on('request-error', this.errorish);

    touchEvents.on('swiperight', function(e){
        if($('#h').length === 0){
            this.changeView();
        }
    }.bind(this));
    touchEvents.on('swipeleft', function(e){
        if($('#h').length > 0){
            this.changeView();
        }
    }.bind(this));

};
