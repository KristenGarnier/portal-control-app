var swal = require('sweetalert');


module.exports = function (e) {
    e.preventDefault();
    e.stopPropagation();
    var data = $('form').serializeArray();
    var first = extractData(data, 1),
        second = extractData(data, 2),
        third = extractData(data, 3);

    localStorage.setItem('urls', JSON.stringify([first, second, third]));

    swal({
        title: "Enregistré !",
        text: "Les modifications ont bien été enregistrées",
        timer: 2000,
        type: 'success',
        showConfirmButton: false
    })
};

var extractData = function (data, filter) {
    return data
        .filter(function (item) {
            return Number(item.name.split("_")[0]) === filter;
        })
        .reduce(function (sum, next) {
            var nextObj = {};
            nextObj[next.name.split('_')[1]] = next.value;
            return Object.assign(sum, nextObj);
        }, {});
};