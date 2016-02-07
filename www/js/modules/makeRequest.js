var request = require('superagent');

module.exports = function (e) {
    $(e.target).append('<i class="fa fa-circle-o-notch fa-spin"></i>');
    if (typeof fetch != 'function') {
        request
            .get($(e.target).data('link'))
        .end(function(err, res){
            $(e.target).find('i').remove();
            if(err !== null){
                console.error(err);
                $('body').trigger('request-error');
            } else {
                $('body').trigger('request-success');
            }
        })

    } else {
        fetch($(e.target).data('link'))
            .then(function () {
                $(e.target).find('i').remove();
                $('body').trigger('request-success');
            })
            .catch(function (err) {
                $(e.target).find('i').remove();
                console.error(err);
                $('body').trigger('request-error');
            });
    }
};
