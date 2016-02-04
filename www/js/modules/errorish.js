var swal = require('sweetalert');

module.exports = function(){
    swal({
        title: "Oups, une erreur est survenue !",
        text: " Quelque chose semble ne pas fonctionner. Vérifiez votre connexion internet, ou le service en ligne.",
        type: 'error',
        showConfirmButton: true
    })
};
