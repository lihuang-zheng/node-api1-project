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

// DELETE
server.delete("/api/users/:id", (req, res) => {
  res.status(200);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** API on http://localhost:${PORT} **\n`)
);
