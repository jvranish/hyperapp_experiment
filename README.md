
## Running it:

My favorite simple webserver (which is what I would recommend for checking out this example) is the built-in python simple webserver (Though any webserver will do).

### For python 3:

    python -m http.server

### For python 2:

    python -m SimpleHTTPServer

### Just using the browser

Alternatively, you _can_ still just use a browser, but due to CORS you'll probably need to disable unique origins for `file:///` see [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp). It has a small security risk, but might be more convenient than the python server.
