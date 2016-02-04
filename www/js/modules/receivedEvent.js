module.exports = function(){
    if (JSON.parse(localStorage.getItem('urls')) === null) {
        this.render(this.templates.modify);
    } else {
        this.render(this.templates.home);
    }
};
