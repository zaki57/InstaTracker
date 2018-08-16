$(document).ready(function () {
    var start = (new Date()).getSeconds();
    chrome.identity.getProfileUserInfo(function (userInfo) {
        console.log("name is" + userInfo.email);
        var name = userInfo.email.split('@', 1);
        console.log("name is" + name);
        $('#user').text(name);
    });

    //setInterval(track, 1000);
    document.addEventListener("visibilitychange", function() {
        if (document.hidden){
            var end = (new Date()).getSeconds();
            end = end - start;
            console.log("time spent before switching = " + end );
        }
        else {
            start = (new Date()).getSeconds();
        } 
    });

    function track(time) {

        var str = '';
        chrome.tabs.getSelected(null, function (tab) {//query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            newUrl = new URL(tab.url);
            chrome.storage.local.get({ userKeyIds: [] }, function (result) {
                var userKeyIds = result.userKeyIds;
                //tabs[0].url;
                var url = new URL(tab.url);
                //var time =  calculate_time(url.hostname, );
                if (!duplicate(url.hostname)) {
                    userKeyIds.push({ 'url': url.hostname, 'time': time });
                }

                chrome.storage.local.set({ userKeyIds: userKeyIds }, function () {

                    chrome.storage.local.get('userKeyIds', function (result) {
                        console.log(result.userKeyIds)
                        str = " ";
                        var length = result.userKeyIds.length;
                        for (var i = 0; i < length; i++) {
                            str += result.userKeyIds[i].url + " " + result.userKeyIds[i].time + '<br>';
                        }

                        $('#url').html(str);
                    });
                });

                function duplicate(url) {
                    var length = result.userKeyIds.length;
                    for (var i = 0; i < length; i++) {
                        if (url == result.userKeyIds[i].url) {
                            return true;
                        }
                    }

                    return false;

                }

            });





        });



    }

});