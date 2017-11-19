


// Function to add rows to #contact-table-container from JSON contacts object
function contactTable(contacts){	
	$('tbody').remove();
	$.each(contacts, function(index, obj) {
		$("#contact-table-container").append(
			"<tr>" +
					"<td>" + obj.Name + "</td>"+
					"<td>" + obj.Title + "</td>"+
					"<td>" + obj.Account + "</td>"+
					"<td>" + obj.Phone + "</td>"+
					"<td>" + obj.Email + "</td>"+
			"</tr>"	
		);
	});
}
	


var loadContacts = function() {
	$.ajax({
		url: "/get/contacts",
		cache: false,
		success: function(contacts) {
			contactTable(contacts.contact);
		}
	});
};

var postContacts = function() {
	var $contactForm = {"Name": $("input[name='Name']").val(), 
											"Title": $("input[name='Title']").val(),
											"Account": $("input[name='Account']").val(),
											"Phone": $("input[name='Phone']").val(),
											"Email": $("input[name='Email']").val()
												};
	console.log($contactForm);


		$.ajax({
		 type: "POST",
		 url: "/post/contact",
		 dataType: "application/json",
		 data: $contactForm,
		 success: function(contacts){
			contactTable(contacts.contact);
			  }
	});
  loadContacts();
};



var loadGames = function() {
	$.ajax({
		url: "/get/games",
		cache: false,
		success: function(html) {
			
			$("#customer-table-container").append(html);
		}
	});
};




/* ------------------------------------------------------------------------ */
/*  BELOW CODE USED FROM W3SCHOOL TEMPLATE: https://www.w3schools.com/w3css/tryw3css_templates_analytics.htm   */

// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}
// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}
	
/* ------------------------------------------------------------------------ */
