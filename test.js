var backgroundJS = chrome.extension.getBackgroundPage();

chrome.runtime.onStartup.addListener(function() {
  setTimeout(function() {
  
  setInterval(function() {

  var domain = { url: [], time: [] };
  var i;
  for (i in backgroundJS.domains) {
    if (backgroundJS.domains.hasOwnProperty(i)) {
      if (backgroundJS.domains[i].days[backgroundJS.dates.today]) {
        domain.url.push(backgroundJS.domains[i].name);
        domain.time.push(
          backgroundJS.domains[i].days[backgroundJS.dates.today].seconds
        );
      }
    }
  }

  chrome.identity.getProfileUserInfo(function(userInfo) {
    var name = userInfo.email.split("@", 1);
    $("#user").text(name);
    var r = {
      url: domain.url,
      time: domain.time,
      username: name
    };

    var s = JSON.stringify(r);
    console.log(r);

    $.post("http://instafoods.test/api/data", r, function(r, status) {
      console.log("Data: " + r + "\nStatus: " + status);
    });
  });

},60000);

},100);


});
