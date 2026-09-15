const express = require("express");
const router = express.Router();

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// GET home page
router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages
  });
});

// GET new message form
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// POST new message
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  messages.push({
    id: messages.length,
    text: messageText,
    user: messageUser,
    added: new Date()
  });
  res.redirect("/");
});

// GET message details by ID
router.get("/message/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const message = messages.find((m) => m.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", { title: "Message Details", message: message });
});

module.exports = router;