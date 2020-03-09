const express = require("express");
const shortid = require("shortid");

const server = express();

let users = [];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running..." });
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// GET
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// // GET ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === String(id));
  if (!user) {
    res.status(404).json({ message: "user with given id does not exist" });
  } else if (!id) {
    res.status(500).json({ message: "server error" });
  } else {
    res.status(200).json(user);
  }
});

// POST
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (name || bio) {
    userInfo.id = shortid.generate();

    users.push(userInfo);

    res.status(201).json(userInfo);
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database"
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** API on http://localhost:${PORT} **\n`)
);
