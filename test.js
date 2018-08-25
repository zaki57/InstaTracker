var backgroundJS = chrome.extension.getBackgroundPage();

var r = {};
var domain = { url: [], time: [] };

chrome.tabs.onActivated.addListener(() => {
  
  var i;
  for (i in backgroundJS.domains) {
    if (backgroundJS.domains.hasOwnProperty(i)) {
      if (backgroundJS.domains[i].days[backgroundJS.dates.today]) {
        domain.url.push(backgroundJS.domains[i].name);
        domain.time.push(
          backgroundJS.domains[i].days[backgroundJS.dates.today].seconds
        );
        //backgroundJS.domains[i].days[backgroundJS.dates.today].seconds = 0;
        //backgroundJS.domains = {};
      }
    }
  }

  chrome.identity.getProfileUserInfo(function(userInfo) {
    var name = userInfo.email.split("@", 1);
    $("#user").text(name);
     r = {
      url: domain.url,
      time: domain.time,
      username: name
    };

    var s = JSON.stringify(r);

    

      backgroundJS.domains = {};


  
    
  });
});

setTimeout(function() {

  

  
  setInterval(function() {

    console.log(r);


  /*
  $.post("http://instafoods.test/api/data", r, function(r, status) {
    console.log("Data: " + r + "\nStatus: " + status);
  });
  */

},60000);

},10000);


