const app = require("./app");
const {
  app: { port },
} = require("./config/server.config");

const PORT = port;

const server = app.listen(PORT, () => {
  console.log(`Connect to RESTAURANT MANAGER at port:::${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Disconnect to server`));
});
