module.exports = function () {
    if ($('#h').length > 0) {
        this.render(this.templates.modify);
    } else {
        this.render(this.templates.home);
    }
};
