








/* ------------------------------------------------------------------------ */
// General javascript

//Select all checkboxes in tables
$(document).ready(function() {
    $('.selectAll').click(function (e) {
        $(this).closest('table').find('td input:checkbox').prop('checked', this.checked);
    });
});







/* ------------------------------------------------------------------------ */
// Account handlers


// Function to add rows to #account-table-container from JSON accounts object
function accountTable(accounts){	
	$('tbody').remove();
	$.each(accounts, function(index, obj) {
		$("#contact-table-container").append(
			"<tr>" +
            		"<td><input type='checkbox' value='" + obj.Id + "' class='inputID'</td>"+
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
	console.log("executing loadAccounts() function");
	$.ajax({
		url: "/get/accounts",
		cache: false,
		success: function(accounts) {
			accountTable(accounts.account);
		}
	});
};



// Add account function
// Function posts text from input fields without using a form to update accounts JSON object and dynamically rebuild table with new data
// Creating this function as a workaround to prevent the page from reloading by a normal form post

var postAccounts = function() {
	$(':button[type="button"]').prop('disabled', true);  // Disable submit button until succesfull return from server to prevent dublicate records
	var $accountForm = {"Name": $(".featherlight-content input[name='Name']").val(), 
											"Industry": $(".featherlight-content input[name='Industry']").val(),
											"Phone": $(".featherlight-content input[name='Phone']").val(),
											"Employees": $(".featherlight-content input[name='Employees']").val(),
											"Website": $(".featherlight-content input[name='Website']").val()
												};
	console.log("Receiving Account information: " + $accountForm);

		$.ajax({
		 type: "POST",
		 url: "/post/account",
		 data: $accountForm,
		 success: function(accounts){
		 	accountTable(accounts.account);
		 	$('.featherlight-close').click();    // close pop-up form
		 	$("input[type=text]").val("");  //remove input values after successfull response
			$(':button[type="button"]').prop('disabled', false);  //Enable add button after succesfull return from server
			}
	});
  
};

// Delete accounts
// Collects the record id's assigned to the checkboxes if they are selected and post them through ajax to be deleted on server

var deleteAccounts = function() {
    $('.delete-button').prop('disabled', true);  // Disable delete button until succesfull return from server
    var $data = [];
    $('.inputID:checked').each(function () {
        $data.push($(this).val());
    });
	console.log("To be deleted: " + $data);
    $.ajax({
        type: "POST",
        url: "/delete/accounts",
        data: {$data},
        success: function(accounts) {
            accountTable(accounts.account);
            $('.delete-button').prop('disabled', false);

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
            		"<td><input type='checkbox' value='" + obj.Id + "'  class='inputID'</td>"+
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
	$(':button[type="button"]').prop('disabled', true);  // Disable add until succesfull return from server to prevent dublicate records 
	var $contactForm = {"Name": $(".featherlight-content input[name='Name']").val(), 
											"Title": $(".featherlight-content input[name='Title']").val(),
											"Account": $(".featherlight-content input[name='Account']").val(),
											"Phone": $(".featherlight-content input[name='Phone']").val(),
											"Email": $(".featherlight-content input[name='Email']").val()
												};
	 console.log("Receiving Contact information from form: " + $contactForm);

		$.ajax({
		 type: "POST",
		 url: "/post/contact",
		 data: $contactForm,
		 success: function(contacts){
			contactTable(contacts.contact);
			     $('.featherlight-close').click(); // close pop-up form
				 $("input[type=text]").val("");  //remove input values after successfull response 
				 $(':button[type="button"]').prop('disabled', false);  //Enable add button after succesfull return from server
			 }
	});
  
};


// Delete accounts
// Collects the record id's assigned of the selected checkboxes and post them with ajax to be server and deleted

var deleteContacts = function() {
    var $data = [];
    $('.inputID:checked').each(function () {
        $data.push($(this).val());
    });
	console.log("To be deleted: " + $data);
    $.ajax({
        type: "POST",
        url: "/delete/contacts",
        data: {$data},
        success: function(contacts) {
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


// Toggle between showing and hiding the sidebar, and add overlay effect

function w3_open() {
	
    if (document.getElementById("mySidebar").style.display === 'block') {
        document.getElementById("mySidebar").style.display = 'none';
        document.getElementById("myOverlay").style.display = "none";
    } else {
        document.getElementById("mySidebar").style.display = 'block';
        document.getElementById("myOverlay").style.display = "block";
    }
}
// Close the sidebar with the close button
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}
	
/* ------------------------------------------------------------------------ */
