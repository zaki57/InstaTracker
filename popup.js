$(document).ready(function () {
    chrome.identity.getProfileUserInfo(function (userInfo) {
        var name = userInfo.email.split('@', 1);
        $('#user').text(name);
    });

    setInterval(
    chrome.storage.local.get('str', function(result) {
    $('#url').html(result.str);
})
,1000);

});






