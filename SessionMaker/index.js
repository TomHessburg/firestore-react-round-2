require("dotenv").config();
const express = require("express");
const OpenTok = require("opentok");

const server = express();
server.use(express.json());

let apiKey = process.env.TOK_KEY;
let apiSecret = process.env.TOK_SECRET;

const opentok = new OpenTok(apiKey, apiSecret);

server.get("/", (req, res) => {
  res.status(200).json({ msg: "All good in the hood!" });
});

// generate a new session ID for the chat
server.get("/new_session", (req, res) => {
  opentok.createSession(function(err, session) {
    if (err) res.status(500).json(err);

    let token = opentok.generateToken(session.sessionId);

    res.status(200).json({ sessionId: session.sessionId, token });
  });
});

server.listen(5000, () => {
  console.log("server listening on port 5k");
});
