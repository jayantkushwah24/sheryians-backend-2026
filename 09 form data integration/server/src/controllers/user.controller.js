const createUser = (req, res) => {
  console.log("body=", req.body);
  console.log("file=", req.files);
  res.json({
    message: "user created successfully",
  });
};

module.exports = createUser;
