//var BASEURL = "";
var BASEURL = "https://www.cloud.elkron.com";

function do_ajax_login() {
	
        $("#login-ok").hide();
        $("#login-ko").hide();
        $("#my-profile-ok").html('login ...:<br>' + BASEURL + "/tool/index.php");
        $("#my-profile-ko").html('');

	$.ajax({
            url: BASEURL + "/tool/index.php",
            type: 'POST',
            cache: false,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'origin': *
            },
            xhrFields: {
                //withCredentials: true
            },
            data: "httpd_username=testelkron&httpd_password=elkrontest",
            success: function(){
                $("#login-ok").show();
                $("#login-ko").hide();
		$.ajax({
			url: BASEURL + '/tool/multiapi/private/getuserprofile/',
			type: 'GET',
			dataType: 'json',
    			xhrFields: {
       				withCredentials: true
    			},
    			crossDomain: true,
			success: function(data) {
        			$("#my-profile-ok").html(JSON.stringify(data), null, 4);
			},
			error: function(data) {
        			$("#my-profile-ko").html(JSON.stringify(data), null, 4);
			}
		})
	    },
	    error: function() {
                $("#login-ok").hide();
                $("#login-ko").show();
	    }
	});
}


