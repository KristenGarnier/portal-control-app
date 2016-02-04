var webpack = require('webpack');
module.exports = {
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "./js/app.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
