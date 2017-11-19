


/* ------------------------------------------------------------------------ */
// Account handlers


// Function to add rows to #account-table-container from JSON accounts object
function accountTable(accounts){	
	$('tbody').remove();
	$.each(accounts, function(index, obj) {
		$("#contact-table-container").append(
			"<tr>" +
					"<td>" + obj.Name + "</td>"+
					"<td>" + obj.Industry + "</td>"+
					"<td>" + obj.Phone + "</td>"+
					"<td>" + obj.Employees + "</td>"+
					"<td>" + obj.Website + "</td>"+
			"</tr>"	
		);
	});
}


//Ajax function to load accounts and build table from accounts JSON object
var loadAccounts = function() {
	$.ajax({
		url: "/get/accounts",
		cache: false,
		success: function(accounts) {
			accountTable(accounts.account);
		}
	});
};



// Ajax function to post text from input fields to update accounts JSON obejct and rebuild table with new data
var postAccounts = function() {
	var $accountForm = {"Name": $("input[name='Name']").val(), 
											"Title": $("input[name='Industry']").val(),
											"Account": $("input[name='Phone']").val(),
											"Phone": $("input[name='Employees']").val(),
											"Email": $("input[name='Website']").val()
												};
	console.log($accountForm);


		$.ajax({
		 type: "POST",
		 url: "/post/account",
		 dataType: "application/json",
		 data: $accountForm,
		 success: function(contacts){
			accountTable(accounts.account);
			  }
	});
  
};







/* ------------------------------------------------------------------------ */
// Contact handlers



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
	

//Ajax function to load contacts and build table from contacts JSON object
var loadContacts = function() {
	$.ajax({
		url: "/get/contacts",
		cache: false,
		success: function(contacts) {
			contactTable(contacts.contact);
		}
	});
};


// Ajax function to post text from input fields to update contacts JSON obejct and rebuild table with new data
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
  
};





/* ------------------------------------------------------------------------ */
//Games handler


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
