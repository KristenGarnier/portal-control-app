var request = require('superagent');

module.exports = function (e) {
    if (typeof fetch != 'function') {
        request
            .get($(e.target).data('link'))
        .end(function(err, res){
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
                $('body').trigger('request-success');
            })
            .catch(function (err) {
                console.error(err);
                $('body').trigger('request-error');
            });
    }
};
