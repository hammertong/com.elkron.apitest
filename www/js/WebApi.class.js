
class WebApi {

  constructor (username, password, endpoint) {
	this.username = username ? username : "testelkron";
	this.password = password ? password : "elkrontest";
        this.client = plugins.elkronApiPlugin;
	if (endpoint) this.client.setEndpoint(endpoint);
  }

  get endpoint () {
	var r = "";
	r += this.username ? this.username : "";
	r += this.password ? ":***@" : "@";
	return r;
  }

  login (successCallback, errorCallback) {
	console.log("logging in ...");
	var options = {
              url: "/index.php",
              type: 'POST',
              contentType: 'application/x-www-form-urlencoded',
              data: "httpd_username=" + this.username + "&httpd_password=" + this.password
        };
	//cordova.exec (successCallback, errorCallback, 'ElkronApiPlugin', 'doRequest', [ options ]);
        this.client.doRequest (
            options,
	    function(data){ 
		if (successCallback) successCallback();
	    },
	    function() {
		if (errorCallback) errorCallback();
	    }
	);
  }     

  request (url, method, data, successCallback, errorCallback) {
	var options = {
              url: url,
              type: method.toUpperCase(),
              contentType: url.indexOf("/webapi/") >= 0 ? 'application/x-www-form-urlencoded' : 'application/json',
              data: data
	};
        this.client.doRequest (
            options,
	    function(pdata){ 
		if (successCallback) successCallback(pdata);
	    },
	    function(pdata) {
		if (errorCallback) errorCallback(pdata);
	    }
	);
  }

}


