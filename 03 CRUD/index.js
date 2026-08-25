const express = require("express");
const app = express();
const PORT = 3000;
let user = [];

app.use(express.json());

// create
app.post("/create", (req, res) => {
  const body = req.body;
  user.push(body);
  res.send("user saved successfully", user);
});

// read
app.get("/", (req, res) => {
  res.send(user);
});

// update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedUser = user.map((u) => {
    if (u.id === id) {
      u.name = name;
    }
  });
  res.send("user updated successfully", updatedUser);
});

// delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = user.filter((u) => u.id !== id);
  user = updatedUser;
  res.send("user delete successfully", user);
});

app.listen(PORT, () => {
  console.log("app is listening on the port ", PORT);
});
