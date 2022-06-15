var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer((req, res) => {
    const urlArray = req.url.split("/");

    if (urlArray.length === 2 && req.url !== "/") {
      try {
        const image = fs.readFileSync("./images/" + urlArray[1]);

        res.writeHead(200, {
          "Content-Type": "image/jpg",
        });

        return res.end(image);
      } catch {}
    }

    console.log(urlArray);

    res.writeHead(404, {
        "Content-Type": "text/html",
      });
  
      res.end("<h1>Url Not Found!...</h1>");
  })
  .listen(3000);
