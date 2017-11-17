var loadCustomers = function() {
  $.ajax({
    url: "/get/customer",
    cache: false,
    success: function(html) {
      $("#customer-table-container").append(html);
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

