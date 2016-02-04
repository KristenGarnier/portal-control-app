module.exports = function(){
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.querySelector('#switch').addEventListener('click', function () {
        this.changeView();
    }.bind(this), false);

    $('body').on('request-success', this.successfull);
    $('body').on('request-error', this.errorish);
};
