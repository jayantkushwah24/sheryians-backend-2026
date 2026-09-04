import app from "./app/app.js";
import config from "./config/env.config.js";

const port = config.PORT || 3000;

app
  .listen(port, "127.0.0.1", () => {
    console.log(`app is listening on the port ${port}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
