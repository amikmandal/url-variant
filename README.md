Note:

My understanding of the cookie instruction was that if we hit refresh it should randomly send the user one of the available variants of the webpage. But if we close the browser and open the application again then it should return the last visited type. I have coded accordingly.

For successful working of cookies:

* Please make sure in Chrome, "on startup" is set to "Open a new Tab".
* Please make sure that in Chrome, in advanced settings, make sure to uncheck "Continue running background apps when Google Chrome is closed".
* Please make sure syncing and personalization is turned off.
* Finally please also make sure no favicon.ico GET requests are sent. I discovered a bug with wrangler in which my code would sometimes run twice to load the favicons. Possible solutions to this would be to changing the port, rerun the code, etc.

These should make sure the cookies work properly.

Also, I wanted to split the code into multiple files but I wasn't sure how modularization works with cloudflare environment and I failed after multiple attempts to do so. Any feedback on how to do so will be amazing.

