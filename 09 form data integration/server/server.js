const app = require("./src/app");

const port = 3000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`app is listening at the port ${port}`);
});

server.on("error", (err) => {
  console.log(`server error`, err);
});
