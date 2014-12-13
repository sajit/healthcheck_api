'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page');
var diagnostics = {
    makeRequest: function(url){
        var deferred = Q.defer();
        $.get(url).done(function(){
            deferred.resolve({url : url,status : 'success'});
        }).fail(function(jqXHR, textStatus, errorThrown){


            console.log('textStatus=',textStatus,'errorThrown=',errorThrown,'jqXhr',jqXHR);
            if(jqXHR.status == 0){
                deferred.resolve({url: url,status : 'danger',errorMessage : 'Network Error'});
            }
            else{
                deferred.resolve({url: url,status : 'warning',errorMessage : errorThrown});
            }
        });
        return deferred.promise;
    }
};

var processConfig = function(configObj){
    var deferred = Q.defer();
    var validUrls = configObj.whitelist || 0;
    var response = {};

    if(configObj.screenResolution){
        response.screenResolution = { height : window.screen.height, width : window.screen.width, supported : false};

        response.screenResolution.supported = window.screen.height >= configObj.screenResolution.height && window.screen.width >= configObj.screenResolution.width;
    }
    var promises = [];

    if(configObj.whitelist){

        response.whitelist = [];
        for(var i=0;i<validUrls.length;i++){
            var url = validUrls[i];
            var httpPromise = diagnostics.makeRequest(url,response);
            httpPromise.then(function(resp){
               response.whitelist.push(resp);
               console.log('Resolved http Promise',resp);
            });
            promises.push(httpPromise);
        }
    }
    Q.all(promises).done(function(){
       console.log('Resolved whole array. Response looks like',response);
       deferred.resolve(response);
    });
    return deferred.promise;

};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.whitelist || request.screenResolution || request.browserMatrix){
            console.log('Jesus is my Lord');
            var promise = processConfig(request);
            promise.then(function(response){
               sendResponse(response);
            });

        }
        return true;

});

