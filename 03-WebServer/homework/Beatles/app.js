// var http = require("http");//para importar desde commonjs
// var fs = require("fs");

import http from "http"; //para importar desde EC6, se debe agragar en el package.json => "type": "module",
import fs from "fs";
import beatles from "./data.js"; //para importar archivos externos en EC6 se debe colocar la extension del archivo.
http
  .createServer((req, res) => {
    const { method, url } = req;
    const pathArray = url.split("/"); //convierte la url en array separado por /

    if (isGet() && url === "/") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      const html = fs.readFileSync("./index.html", "utf-8");

      return res.end(html);
    } else if (isGet() && pathArray.length === 2) {
      const beatle = beatles.find(
        //(beatle) => encodeURI(beatle.name) === pathArray[1]//con encodeURI
        (beatle) => beatle.name === decodeURI(pathArray[1]) //con decodeURI
      );

      if (beatle) {
        //console.log(beatle);
        res.writeHead(200, {
          "Content-Type": "text/html",
        });

        const html = fs
          .readFileSync("./beatle.html", "utf-8")
          .replaceAll("{name}", beatle.name)
          .replaceAll("{birthdate}", beatle.birthdate)
          .replaceAll("{profilePic}", beatle.profilePic);

        return res.end(html);
      }
    } else if (isGet() && url === "/api") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      return res.end(JSON.stringify(beatles));
    } else if (isGet() && pathArray.length === 3 && pathArray[1] === "api") {
      const beatle = beatles.find(
        //(beatle) => encodeURI(beatle.name) === pathArray[2]//con encodeURI
        (beatle) => beatle.name === decodeURI(pathArray[2]) //con decodeURI
      );

      if (beatle) {
        //console.log(beatle);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        return res.end(JSON.stringify(beatle));
      }
    }

    console.log(pathArray);

    res.writeHead(404, {
      "Content-Type": "text/html",
    });

    res.end("<h1>Url Not Found!...</h1>");

    function isGet() {
      return method === "GET";
    }
  })
  .listen(3000);
