$(document).ready(function () {
    chrome.identity.getProfileUserInfo(function (userInfo) {
        var name = userInfo.email.split('@', 1);
        $('#user').text(name);
    });

});

function print(str) {
    $('#url').html(str);
}



