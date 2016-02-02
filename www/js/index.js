/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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

var app = {
    // Application Constructor
    initialize: function () {
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
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.querySelector('#switch').addEventListener('click', function () {
            this.changeView();
        }.bind(this), false);

        $('body').on('request-success', this.successfull);
        $('body').on('request-error', this.errorish);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function () {
        if (JSON.parse(localStorage.getItem('urls')) === null) {
            this.render(this.templates.modify);
        } else {
            this.render(this.templates.home);
        }

    },

    changeView: function () {
        if ($('#h').length > 0) {
            this.render(this.templates.modify);
        } else {
            if (JSON.parse(localStorage.getItem('urls')) === null) {
                this.render(this.templates.modify);
            } else {
                this.render(this.templates.home);
            }
        }
    },

    saveData: function (e) {
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
    },

    makeRequest: function (e) {
        fetch($(e.target).data('link'))
            .then(function () {
                $('body').trigger('request-success');
            })
            .catch(function (err) {
                console.error(err);
                $('body').trigger('request-error');
            })
    },

    successfull: function(){
        swal({
            title: "Action effectuée !",
            text: "L'action effectuée va prendre place dans quelques instants",
            timer: 2000,
            type: 'success',
            showConfirmButton: false
        })
    },

    errorish: function(){
        swal({
            title: "Oups, une erreur est survenue !",
            text: " Quelque chose semble ne pas fonctionner. Vérifiez votre connexion internet, ou le service en ligne.",
            type: 'error',
            showConfirmButton: true
        })
    },

    render: function (template) {
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
    },

    resetBinding: function () {
        $('button').unbind("click");
    }
};

app.initialize();

/// polyfills
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}