Note:

My understanding of the cookie instruction was that if we hit refresh it should randomly send the user one of the available variants of the url. But if we close the browser and open the application again then it should return the last visited type. I have coded accordingly.

For successful working of cookies please make sure in Chrome, on startup is set to "Open a new Tab"
Also plase make sure that in Chrome, in advanced settings, make sure to uncheck "Continue running background apps when Google Chrome is closed"
Also make sure no favicon.ico GET requests are sent. I discovered a bug with wrangler in which my code would run twice to load the favicons.

These three should make sure the cookies work properly.

Also, I wanted to split the code into multiple files but I wasn't sure how modularization works with cloudflare environment and I failed after multiple attempts to do so.

Cloudflare URL: https://url-variant.amikmandal.workers.dev/

