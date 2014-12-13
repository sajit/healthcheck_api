healthcheck_api
===============

A chrome extension for clientside health check .
A hackathon project that I worked on.

What does this mean
===================
Today with the push towards microservices based architecture, your web client may end up calling different servers. 
This chrome extension provides an interface that you can call from your web page and it returns a bunch of information including
which 
* urls are accessible, 
* whether your os / browser is supported and 
* screen resolution is supported.

What do I need to do
====================
An example is provided in sample/sample.html

Have content in the following format. An example as shown below.


```json
{
    "whitelist": [
        "https://google.com",
        "https://google.com/sdss",
        "https://twitter.com",
        "https://xkcd.com",
        "https://dsfds.ewew"
    ],
    "screenResolution": {
        "height": 768,
        "width": 1024
    },
    "browserMatrix": [
        {
            "os": {
                "name": "iOS",
                "version": 7
            },
            "browser": {
                "name": "Safari",
                "version": 7
            }
        },
        {
            "os": {
                "name": "iOS",
                "version": 7
            },
            "browser": {
                "name": "Chrome",
                "version": 32
            }
        },
        {
            "os": {
                "name": "MacOSX"
            },
            "browser": {
                "name": "Chrome",
                "version": 32
            }
        }
    ]
}
```


And do a ```window.postMessage();``` to which the contentscript.js has a listener

Have an html element **diagnosticsResponseDiv** that will get updated with the results of the diagnosis.

What is remaining
===================
Tons. This was a hackathon project. There is much left to clean up and refactor. I would love feedback on the code. 
There are many more checks that you could run. 
Always love to hear your thoughts / comments / feedback. 
