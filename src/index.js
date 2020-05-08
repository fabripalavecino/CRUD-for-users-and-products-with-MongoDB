let http = require("http");
let url = require("url");
let querystring =require("querystring");
let { info, error } = require("./modules/my-log");
let { countries } = require("countries-list");

let server = http.createServer((req, res) => {
  let parsed = url.parse(req.url);
  console.log(parsed);
  
  let pathname = parsed.pathname;

  let query =  querystring.parse(parsed.query);
  console.log(query);

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      "<html><head></head><body><p><h1>Hola Fabricio desde Homepage</h1></p></body></html>"
    );
    res.end();
  } else if (pathname === "/info") {
    let result = info(pathname);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(result);
    res.end();
  } else if (pathname === "/country") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(countries[query.code]));
    res.end();
  } else if (pathname === "/error") {
    let result = error(pathname);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(result);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(
      "<html><head></head><body><p><h1>NOT FOUND</h1></p></body></html>"
    );
    res.end();
  }
});

server.listen(4000);
console.log("Running on port 4000");
