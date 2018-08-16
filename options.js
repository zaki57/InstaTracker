$(document).ready(function(){
$('#clear').click(function() {
    
    chrome.storage.local.clear(function() {
    // var error = chrome.runtime.lastError;
    // console.log('inside');
    // if (error) {
    //     console.error(error);
    //}
});
});
});