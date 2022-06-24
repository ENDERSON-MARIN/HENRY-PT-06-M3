/* importamos los módulos */
const app = require("./app");
require("dotenv").config(); //para leer las variables de entorno

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Listening in http://localhost:${PORT}/`);
});
