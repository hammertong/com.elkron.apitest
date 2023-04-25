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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // begin Elkron integration 
    var api = new WebApi();
    api.login(
	function() {
    	    document.getElementById("login-ok").style.display = 'block';
	    api.request(
		'/multiapi/private/getuserprofile/', 
		"GET",
		null, 
		function (data) {
			var profile = JSON.parse(data);
			document.getElementById('my-profile-ok').innerHTML =
			'<ul>' 
			+ '<li>Hello ' + profile.name + '</li>'
			+ '<li>' + profile.email + '</li>'
			+ '<ul>'; 
		},
		function (data) {
			document.getElementById('my-profile-ko').innerHTML = data;
		}
	    );
	},
	function() {
    	    document.getElementById("login-ko").style.display = 'block';
	}
    );    
    // end Elkron integration



}
