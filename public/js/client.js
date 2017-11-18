



var contactTable = function(contacts) {

	/*
	$(function() {
    $.each(contacts, function(i, item) {
        var $tr = $('<tr>').append(
            $('<td>').contacts.contact(item.name),
            $('<td>').contactscontact(item.Title),
            $('<td>').contactscontact(item.Account),
						$('<td>').contactscontact(item.Phone),
						$('<td>').contactscontact(item.Email)
        ); //.appendTo('#records_table');
        console.log($tr.wrap('<p>').html());
    });
})*/

	$.each(contacts, function(i) {
    var tr = $('<tr/>');
    tr.append("<td>" + contacts.contact[i].Name + "</td>");
    tr.append("<td>" + contacts.contact[i].Title + "</td>");
    tr.append("<td>" + contacts.contact[i].Account + "</td>");
		tr.append("<td>" + contacts.contact[i].Phone + "</td>");
		tr.append("<td>" + contacts.contact[i].Email + "</td>");
    $(".customer-table").append(tr);
  });

};




/*

// Ajax functions to call the app through get routers
var loadContacts = function() {
	$.ajax({
		url: "/get/contacts",
		cache: false,
		dataType: 'json',
		success: function(contacts) {
			
			$(".customer-table").append(
				"<td>"+contacts.contact[0].Name + "</td>"
			);	
				
						
			
	  }
	})
};

*/

var loadContacts = function() {
	$.ajax({
		url: "/get/contacts",
		cache: false,
		success: function(html) {
			console.log(html);
			$("#contact-table-container").append(html);
		}
	});
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
