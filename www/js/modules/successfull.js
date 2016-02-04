var swal = require('sweetalert');

module.exports = function(){
    swal({
        title: "Action effectuée !",
        text: "L'action effectuée va prendre place dans quelques instants",
        timer: 2000,
        type: 'success',
        showConfirmButton: false
    })
};
