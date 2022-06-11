//console.log(process) //process objeto global de nodejs, puede ser accedido desde cualquier parte
//console.log(Object.keys(process)) //para ver todas las propíedades de process

const commands = require("./commands");

function write(data) {
  process.stdout.write(data);
}

function done() {
  process.stdout.write("\nprompt > ");
}

// Output un prompt
process.stdout.write("prompt > ");

// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var [cmd, ...args] = data.toString().trim().split(" ");
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, write, done);
  } else {
    process.stdout.write(`Command ${cmd} Not Found 🤪`);
    process.stdout.write("\nprompt > ");
  }
});
