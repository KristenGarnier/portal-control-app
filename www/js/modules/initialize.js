var Handlebars = require('handlebars');

module.exports = function(){
    this.bindEvents();

    var home = $('#home').html();
    var modify = $('#modify').html();
    this.templateHome = Handlebars.compile(home);
    this.templateModify = Handlebars.compile(modify);
    this.container = $('#app');

    this.templates = {
        modify: "MODIFY",
        home: "HOME"
    };

    this.receivedEvent();
};