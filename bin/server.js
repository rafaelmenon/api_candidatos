const app = require("../src/app");
const http = require("http");
const debug = require("debug")("nodestr:server");

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 4109);
app.set("port", port);

function onError(e) {
  if (e.syscall !== "listen") {
    throw e;
  }

  const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  switch (e.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);

    default:
      throw e;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + addr.port;
  debug("Listening on " + bind);
}

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
console.log(`API is alive on ${port}`);
