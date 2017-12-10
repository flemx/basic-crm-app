





/* ------------------------------------------------------------------------ */
// Event handlers




$(document).ready(function(){



    /*
     *  Function to validate that only 1 record is selected when update button is clicked
     */
    $("#table-update-button").click(function () {
        var $popup = $("#updatePopup");
        console.log("Checkboxes checked: " + $('.inputID:checked').length);
        if ($('.inputID:checked').length > 1 || $('.inputID:checked').length === 0) {
            $popup.toggleClass("show");
        }
        else if ($('.inputID:checked').length === 1) {
            $.featherlight($('.update-lightbox'), {});
            if ($pageId === 1) {
                console.log("Open contact update form");
                $("#updatePopup").removeClass("show");
                updateContactForm();
            }
            if ($pageId === 0) {
                console.log("Open Account update form");
                updateAccountForm();
                $popup.removeClass("show");
            }
        }
    });


    /*
     *  Function to validate that only minimum 1 record is selected when delete button is clicked
     */

    $("#table-del-button").click(function () {
        var $popup = $("#delPopup");
        console.log("Checkboxes checked: " + $('.inputID:checked').length);
        if ($('.inputID:checked').length === 0) {
            $popup.toggleClass("show");
        }
        else if ($('.inputID:checked').length > 0){
            $popup.removeClass("show");
            if ($pageId === 1) {
                deleteContacts();
            }
            if ($pageId === 0) {
                deleteAccounts();
            }
        }
    });


    /*
     *  Remove update/del popup if other buttons are pressed
     */
    $('#table-add-button').add('#table-del-button').click( function () {
        $("#updatePopup").removeClass("show");
        }
    )
    $('#table-add-button').add('#table-update-button').click( function () {
            $("#delPopup").removeClass("show");
        }
    )


});




/* ------------------------------------------------------------------------ */
// Multipage functions


// Function to search in the table
var searchFunction = function () {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("records-table-container");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; //skips the first field and gets the second with the name
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
};











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


// Function to add rows to #records-table-container from JSON accounts object - without refreshing the whole page

function accountTable(accounts){
	$('tbody').remove();
	$.each(accounts, function(index, obj) {
		$("#records-table-container").append(
			"<tr>" +
            		"<td><input type='checkbox' value='" + obj.Id + "' class='inputID'</td>"+
					"<td><a href='/account/" + obj.Id + "'>" + obj.AccountName + "</a></td>"+
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

var postAccount = function() {
    $(':button[type="button"]').prop('disabled', true);  // Disable add until successful return from server to prevent duplicate records
    $addForm = $(".featherlight-content .add-account-form");
    var $accountForm = {
        "AccountName": $addForm.find("input[name='AccountName']").val(),// creates an array with feat featherlight-content .add-account-form input[name='AccountName'
        "Industry": $addForm.find("input[name='Industry']").val(),
        "Employees": $addForm.find("input[name='Employees']").val(),
        "Revenue": $addForm.find("input[name='Revenue']").val(),
        "Phone": $addForm.find("input[name='Phone']").val(),
        "Website": $addForm.find("input[name='Website']").val(),
        "Address": $addForm.find("input[name='Address']").val(),
        "City": $addForm.find("input[name='City']").val(),
        "State": $addForm.find("input[name='State']").val(),
        "Zipcode": $addForm.find("input[name='Zipcode']").val(),
        "Country": $addForm.find("input[name='Country']").val(),
        "Description": $addForm.find("textarea[name='Description']").val()
    };
    console.log("Adding Account information with Name : " + $accountForm.AccountName);// for debuging purposes
	
        $.ajax({ // calling the ajax function and posting the object to server to the account json file
		 type: "POST",
		 url: "/post/account",
		 data: $accountForm, // is the object it self
		 success: function(accounts){ // server sends successful respond
		 	accountTable(accounts.account); // calls the accout table funciton which deletes the data and recreates the table with the new data
		 	$('.featherlight-close').click();    // close pop-up form
		 	$("input[type=text]").val("");  //remove input values after successfull response
			$(':button[type="button"]').prop('disabled', false);  //Enable add button after succesfull return from server
			}
	});
}

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





// Function to populate update form in Accounts page
var updateAccountForm = function(){
    var id =  $('.inputID:checked').val();
    console.log("Opening account ID: " + id);

    $.ajax({
        url: "/get/account/" + id,
        cache: false,
        success: function(account) {
            console.log("Returned account: " + account.AccountName);
            $updateForm = $(".update-account-form");
            $updateForm.find("input[name='Id']").val(account.Id);
            $updateForm.find("input[name='AccountName']").val(account.AccountName);
            $updateForm.find("input[name='Industry']").val(account.Industry);
            $updateForm.find("input[name='Employees']").val(account.Employees);
            $updateForm.find("input[name='Revenue']").val(account.Revenue);
            $updateForm.find("input[name='Phone']").val(account.Website);
            $updateForm.find("input[name='Website']").val(account.Website);
            $updateForm.find("input[name='Address']").val(account.Address);
            $updateForm.find("input[name='City']").val(account.City);
            $updateForm.find("input[name='State']").val(account.State);
            $updateForm.find("input[name='Zipcode']").val(account.Zipcode);
            $updateForm.find("input[name='Country']").val(account.Country);
            $updateForm.find("textarea[name='Description']").val(account.Description);
        }
    });
};



//This function will update the account with the information in the account update form
var updateAccount = function(){

    //creating account object from the information in the update form
    var $updateForm = $(".featherlight-content .update-account-form");
    var $accountForm = {
        "Id": $updateForm.find("input[name='Id']").val(),
        "AccountName": $updateForm.find("input[name='AccountName']").val(),
        "Industry": $updateForm.find("input[name='Industry']").val(),
        "Employees": $updateForm.find("input[name='Employees']").val(),
        "Revenue": $updateForm.find("input[name='Revenue']").val(),
        "Phone": $updateForm.find("input[name='Phone']").val(),
        "Website": $updateForm.find("input[name='Website']").val(),
        "Address": $updateForm.find("input[name='Address']").val(),
        "City": $updateForm.find("input[name='City']").val(),
        "State": $updateForm.find("input[name='State']").val(),
        "Zipcode": $updateForm.find("input[name='Zipcode']").val(),
        "Country": $updateForm.find("input[name='Country']").val(),
        "Description": $updateForm.find("textarea[name='Description']").val()
    };


    console.log("Updating account: " + $accountForm.AccountName);

    //Send account object to server with Ajax to update the account
    $.ajax({
        type: "POST",
        url: "/account/update",
        data: $accountForm,
        success: function(accounts){

            accountTable(accounts.account);
            $('.featherlight-close').click();
            $("input[type=text]").val("");
            $(':button[type="button"]').prop('disabled', false);
        }
    });

};



//Export Accounts to XMl
var exportAccounts = function() {
    $.ajax({
        url: "/export/accounts",
        cache: false,
        success: function(success) {
            console.log(success);
            $('.hide-export-download').removeClass('showme');

        }
    });
};







/* ------------------------------------------------------------------------ */
// Contact handlers





// Function to add rows to #contact-table-container from JSON contacts object
function contactTable(contacts){
    $('tbody').remove();
    $.each(contacts, function(index, obj) {
        $("#records-table-container").append(
            "<tr>" +
            "<td><input type='checkbox' value='" + obj.Id + "'  class='inputID'</td>"+
            "<td><a href='/contact/" + obj.Id + "'>" + obj.FirstName + " " + obj.LastName + " </a></td>"+
            "<td>" + obj.Title + "</td>"+
            "<td>" + obj.Account + "</td>"+
            "<td>" + obj.Phone + "</td>"+
            "<td>" + obj.Email + "</td>"+
            "</tr>"
        );
    });
}






// Ajax function to post text from input fields to update contacts JSON object and rebuild table with new data
var postContact = function() {
    $(':button[type="button"]').prop('disabled', true);  // Disable add until successful return from server to prevent duplicate records
    var $addForm =  $(".featherlight-content .add-contact-form");
    var $contactForm = {

        "FirstName": $addForm.find("input[name='FirstName']").val(),
        "LastName": $addForm.find("input[name='LastName']").val(),
        "Title": $addForm.find("input[name='Title']").val(),
        "Account": $addForm.find("input[name='Account']").val(),
        "Phone": $addForm.find("input[name='Phone']").val(),
        "Email": $addForm.find("input[name='Email']").val(),
        "Address": $addForm.find("input[name='Address']").val(),
        "City": $addForm.find("input[name='City']").val(),
        "State": $addForm.find("input[name='State']").val(),
        "Zipcode": $addForm.find("input[name='Zipcode']").val(),
        "Country": $addForm.find("input[name='Country']").val(),
        "Description": $addForm.find(" textarea[name='Description']").val()
    };
    console.log("Adding Contact information with Name : " + $contactForm.FirstName + "\n Desciption: " + $contactForm.Description);


    $.ajax({
        type: "POST",
        url: "/post/contact",
        data: $contactForm,
        success: function(contacts){
            contactTable(contacts.contact);
            $('.featherlight-close').click(); // close pop-up form
            $("input[type=text]").val("");  //remove input values after successful response
            $(':button[type="button"]').prop('disabled', false);  //Enable add button after successful return from server
        }
    });


}





// Delete contacts
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



//Update contacts


// Function to populate update form with selected contact in Contacts page
var updateContactForm = function(){
    var id =  $('.inputID:checked').val();
    console.log("Opening contact ID: " + id);

    $.ajax({
        url: "/get/contact/" + id,
        cache: false,
        success: function(contact) {
            console.log("Returned contact: " + contact.Id);
            var $update = $(".update-contact-form");
            $(".update-contact-form  input[name='Id']").val(contact.Id);

            $update.find("input[name='FirstName']").val(contact.FirstName);
            $update.find("input[name='LastName']").val(contact.LastName);
            $update.find("input[name='Title']").val(contact.Title);
            $update.find("input[name='Account']").val(contact.Account);
            $update.find(" input[name='Phone']").val(contact.Phone);
            $update.find(" input[name='Email']").val(contact.Email);
            $update.find(" input[name='Address']").val(contact.Address);
            $update.find(" input[name='City']").val(contact.City);
            $update.find(" input[name='State']").val(contact.State);
            $update.find(" input[name='Zipcode']").val(contact.Zipcode);
            $update.find(" input[name='Country']").val(contact.Country);
            $update.find(" textarea[name='Description']").val(contact.Description);

        }
    });
};

//This function will update the contact with the information in the contact update form
var updateContact = function(){
    var $updateContact =  $(".featherlight-content .update-contact-form");
    //creating account object from the information in the update form
    var $contactForm = {
        "Id": $updateContact.find("input[name='Id']").val(),
        "FirstName": $updateContact.find("input[name='FirstName']").val(),
        "LastName": $updateContact.find("input[name='LastName']").val(),
        "Title": $updateContact.find("input[name='Title']").val(),
        "Account": $updateContact.find("input[name='Account']").val(),
        "Phone": $updateContact.find("input[name='Phone']").val(),
        "Email": $updateContact.find("input[name='Email']").val(),
        "Address": $updateContact.find("input[name='Address']").val(),
        "City": $updateContact.find("input[name='City']").val(),
        "State": $updateContact.find("input[name='State']").val(),
        "Zipcode": $updateContact.find("input[name='Zipcode']").val(),
        "Country": $updateContact.find("input[name='Country']").val(),
        "Description": $updateContact.find("textarea[name='Description']").val()
    };

    console.log("Updating contact: " + $contactForm.Id);

    //Send account object to server with Ajax to update the account
    $.ajax({
        type: "POST",
        url: "/contact/update",
        data: $contactForm,
        success: function(contacts){
            contactTable(contacts.contact);
            $('.featherlight-close').click();
            $("input[type=text]").val("");
            $(':button[type="button"]').prop('disabled', false);
        }
    });

};


//Export contacts to XMl
var exportContacts = function() {
    $.ajax({
        url: "/export/contacts",
        cache: false,
        success: function(success) {
            console.log(success);
            $('.hide-export-download').removeClass('showme');

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
