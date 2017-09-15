Url shortener API

Instructions: Pass an URL as parameter to recieve it shortened in a JSON response. The link will redirect to the original URL.

Example creation usage:

https://3-api-url-shortener.glitch.me/https://www.google.com
https://3-api-url-shortener.glitch.me/https://www.freecodecamp.org/challenges/url-shortener-microservice
Example creation output:

{ "original_url": "https://en.wikipedia.org/wiki/Main_Page", 
  "shortened_url": "https://3-api-url-shortener.glitch.me/5s2" }
Usage:

https://3-api-url-shortener.glitch.me/5s2
Will redirect to:

https://en.wikipedia.org/wiki/Main_Page