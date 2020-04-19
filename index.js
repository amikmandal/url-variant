const PERSONAL_LINK = "https://www.linkedin.com/in/amik-mandal/"

let map = new Map()
map.set("title","Coding Challenge")
map.set("h1#title","By Amik Mandal")
map.set("p#description","Thank you for this project. I enjoyed it and got to learn a lot of things. Please make sure to check out the Readme. Also, please note this is Variant ")
map.set("a#url","Click to know more about me")

class ElementHandler {
  constructor(urlIndex){
    this.variant = urlIndex + 1
  }
  element(element) {
    const tagName = element.tagName
    const id = element.getAttribute("id")
    var string = id ? map.get(tagName + "#" + id) : map.get(tagName)
    if(tagName === "a" && id === "url")
      element.setAttribute("href",PERSONAL_LINK)
    if(tagName === "p")
      string += this.variant
    if (string) {
      element.setInnerContent(string)
    }
  }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
    const jsonResponse = await response.json()
    var urls = jsonResponse.variants
  } catch (err) {
    console.log(err)
  }
  return await getUrl(urls,request)
}

async function getUrl(urls,request) {
  //code generalized to any number of variants
  const variant = parseInt(getCookie(request,"variant"))
  //refresh differentiates between if the fetch request is due to a reload page request or an initial app request after closing the application
  const refresh = getCookie(request,"refresh")
  const random = Math.floor(Math.random() * urls.length)
  //isNaN check serves to distinguish between first opening of application (no-cookies whatsoever) or just returning to application after closing it.
  const urlIndex = isNaN(variant) ? random : refresh == null ? variant - 1 : random
  const response = await fetch(urls[urlIndex])
  const html = await response.text();
  const original = new Response(html, {
    headers: {'content-type': 'text/html'}
  });
  const elementHandler = new ElementHandler(urlIndex)
  var modified = new HTMLRewriter()
  for (const entry of map.entries()) {
    modified.on(entry[0],elementHandler)
  }
  const updated = modified.transform(original)
  setCookie(updated,"variant",urlIndex+1,1000)
  if(refresh == null)
    setCookie(updated,"refresh","true",null)
  return updated
}

function setCookie(response,name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  response.headers.set('Set-Cookie', name + "=" + (value || "")  + expires + "; path=/");
}

function getCookie(request, name) {
  let result = null
  let cookieString = request.headers.get('Cookie')
  if (cookieString) {
    let cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      let cookieName = cookie.split('=')[0].trim()
      if (cookieName === name) {
        let cookieVal = cookie.split('=')[1]
        result = cookieVal
      }
    })
  }
  return result
}