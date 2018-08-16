

var  str = "";
var url, prev_url, length;
var userKeyIds ;

chrome.tabs.getSelected(null, function (tab) {
    newUrl = new URL(tab.url);
    prev_url = newUrl.hostname;
});
    
    var end;
    var start = new Date();

    chrome.tabs.onActivated.addListener(function(e) {
        end = new Date();
        time_spent =  calculate_time(start,end);
        get();
        setAndShow(prev_url, time_spent, e.id);
        start = end;

        chrome.tabs.getSelected(null, function (tab) {
            newUrl = new URL(tab.url);
            url = newUrl.hostname;
            get();
            prev_url = url;
        });

});

function get() {
    chrome.storage.local.get({ userKeyIds: [] }, function(result) {
        userKeyIds = result.userKeyIds;
       
    });
}

function setAndShow(url, time, tabId) {
    if(!duplicate(url)) {
        userKeyIds.push({ 'url': url, 'time': time });
    }
    else
    {
            get();
             length = userKeyIds.length;
             for(var i = 0;i<length; i++) {
                 if(userKeyIds[i].url == url) {
                     userKeyIds[i].time += time;
                 }
             }


    }
    
chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {

    chrome.storage.local.get({ userKeyIds: [] }, function (result) {
        str = " ";
         length = result.userKeyIds.length;
        for (var i = 0; i < length; i++) {
            str += result.userKeyIds[i].url + " time : " + result.userKeyIds[i].time + '\n';
        }

      $('#url').html(str);
    
       
    });
});

}

function duplicate(url) {

    var length = userKeyIds.length;
    for (var i = 0; i < length; i++) {
        if (url == userKeyIds[i].url) {
            return true;
        }
    }

    return false;

}

function calculate_time(start, end) {

    var start_sec, start_hour, start_min, end_hour, end_min, end_sec, time_spent;
    start_sec = start.getSeconds(); //seconds 
    end_sec = end.getSeconds(); //seconds

    start_min = start.getMinutes(); //minutes
    end_min = end.getMinutes(); //minutes

    start_hour = start.getHours(); //hours
    end_hour = end.getHours(); //hours

    

    time_spent = (3600*end_hour + 60*end_min + end_sec) - (3600*start_hour + 60*start_min + start_sec);

    return time_spent;

}

setInterval(function() {
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;

        if (error) {
            console.log('inside');
        }
    });
}, 10000);




// chrome.storage.onChanged.addListener(function (change) {
//     chrome.browserAction.setBadgeText({ 'text': change.total.newValue.toString() })
// });