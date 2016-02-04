module.exports = function (template) {
    this.resetBinding();
    switch (template) {
        case this.templates.modify:
            var context = {buttons: JSON.parse(localStorage.getItem('urls'))};
            this.container.html(this.templateModify(context));
            $('#switch').removeClass('fa-cog').addClass('fa-arrow-left');
            $('#sauvegarde').removeClass('hide');
            $('#sauvegarde').on('click', this.saveData);
            break;
        case this.templates.home:
            var context = {buttons: JSON.parse(localStorage.getItem('urls'))};
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
