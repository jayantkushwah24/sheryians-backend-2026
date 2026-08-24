const http = require("http");

let server = http.createServer((req, res) => {
  console.log("hello i am a server");
  res.end("ok i heard you");
});

server.listen(3000, () => {
  console.log("serving is listening on port 3000");
});
