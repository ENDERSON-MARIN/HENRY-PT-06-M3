const fs = require("fs");
const request = require("request")

function date(_, write, done) {
  write(Date());
  done();
}

function pwd(_, write, done) {
  write(process.cwd());
  done();
}

function ls(_, write, done) {
  fs.readdir(".", function (err, files) {
    //readdir recibe 2 parametros, error y  los files
    if (err) throw err; //si recibe el error lanza el error
    files.forEach(function (file, i) {
      //si no hay error recorre el array de files y lo muestra por consola.
      write((i !== 0 ? "\n" : "") + file.toString());
    });
    done();
  });
}

function echo(args, write, done) {
  write(args.join(" "));
  done();
}

// function cat(args, write, done) {
//   fs.readFile(args[0], "utf-8", function (err, data) {
//     if (err) throw err;
//     write(data);
//     done();
//   });
// }

/* OPTIMIZANDO EL CÓDIGO */

function cat(args, write, done) {
  readEveryFile(args[0], write, done);
}

// function head(args, write, done) {
//   fs.readFile(args[0], "utf-8", function (err, data) {
//     if (err) throw err;
//     const lines = data.split("\n").slice(0, 10);
//     lines.forEach((line, i) => {
//       write((i !== 0 ? "\n" : "") + line);
//     });
//     done();
//   });
// }

/* OPTIMIZANDO EL CÓDIGO */

function head(args, write, done) {
  readEveryFile(args[0], write, done, Number(args[1] || 5));
}

// function tail(args, write, done) {
//   fs.readFile(args[0], "utf-8", function (err, data) {
//     if (err) throw err;
//     const lines = data.split("\n").slice(-10);
//     lines.forEach((line, i) => {
//       write((i !== 0 ? "\n" : "") + line);
//     });
//     done();
//   });
// }

/* OPTIMIZANDO EL CÓDIGO */

function tail(args, write, done) {
  readEveryFile(args[0], write, done, Number(args[1] || 5) * -1);
}

function readEveryFile(path, write, done, writeLines) {
  fs.readFile(path, "utf-8", function (err, data) {
    if (err) throw err;
    let lines = data.split("\n");
    if (writeLines > 0) {
      lines = lines.slice(0, writeLines);
    } else if (writeLines < 0) {
      lines = lines.slice(writeLines);
    }
    lines.forEach((line, i) => {
      write((i !== 0 ? "\n" : "") + line);
    });
    done();
  });
}

function curl(args, write, done){
    request(args[0],(_error, _response, body) =>{
        write(body);
        done();
    })
}

module.exports = {
  date,
  pwd,
  ls,
  echo,
  cat,
  head,
  tail,
  curl
};
