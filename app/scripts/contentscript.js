'use strict';

console.log('\'Allo \'Allo! Content script');

var port = chrome.runtime.connect();
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        console.log("Content script received: ");
        var configObject = JSON.parse(event.data.text);
        chrome.runtime.sendMessage(configObject, function(response) {
            console.log('Got a response from background',response);
         if(configObject.browserMatrix) {
             var ua = detect.parse(window.navigator.userAgent);
             response.browser = { supported: false};
             response.os = {supported: false};
             console.log('OS', ua.os, 'Browser=', ua.browser);
             response.browser.name = ua.browser.name;
             response.os.name = ua.os.name;
             for (var i = 0; i < configObject.browserMatrix.length; i++) {
                 var elem = configObject.browserMatrix[i];
                 //console.log('Browser Matrixx',elem);
                 if (ua.browser.family === elem.browser.name && elem.browser.version <= ua.browser.major) {
                     response.browser.supported = true;
                 }
                 if ((elem.os.version && elem.os.version <= ua.os.major) || ua.os.family === elem.os.name) {
                     response.os.supported = true;
                 }

             }
         }
            document.getElementById('diagnosticsResponseDiv').innerHTML = JSON.stringify(response);

        });
    }
}, false);



