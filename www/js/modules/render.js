module.exports = function (template) {
    this.resetBinding();
    var data = JSON.parse(localStorage.getItem('urls')), context;
    switch (template) {
        case this.templates.modify:
            context = {buttons: data};
            this.container.html(this.templateModify(context));
            $('#switch').removeClass('fa-cog').addClass('fa-arrow-left');
            $('#sauvegarde').removeClass('hide');
            $('#sauvegarde').on('click', this.saveData);
            break;
        case this.templates.home:
            context = {buttons: data, empty: buttonCheck(data).length <= 0};
            this.container.html(this.templateHome(context));
            $('#switch').removeClass('fa-arrow-left').addClass('fa-cog');
            $('#sauvegarde').addClass('hide');
            $('button').on('click', this.makeRequest);
            break;
        default:
            console.error('Wrong template provided');
            break;
    }
};

function buttonCheck(buttons){
    if( buttons === null) return [];

    return buttons.filter(function(item){
        return 'active' in item;
    });
}
