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

window.jQuery = window.$ = require("jquery");

'use strict';

var app = {
    // Application Constructor
    initialize: require('./modules/initialize'),
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: require('./modules/bindEvent'),
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: require('./modules/onDeviceReady'),
    // Update DOM on a Received Event
    receivedEvent: require('./modules/receivedEvent'),

    // template selector
    changeView: require('./modules/changeView'),

    // Save user date
    saveData: require('./modules/saveData'),

    // Make request to the provided link
    makeRequest: require('./modules/makeRequest'),

    //Success handler for request
    successfull: require('./modules/successfull'),

    // Error handler for request
    errorish: require('./modules/errorish'),

    // Method used to render the template and create new watchers
    render: require('./modules/render'),

    // unwatch buttons to not have multiple watchers for this
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