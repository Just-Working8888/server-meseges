const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { name, message, email } = req.body;

  if (!name || !message || !email) {
    return res.status(400).json({
      error: "Пожалуйста, заполните все поля (имя, сообщение, email).",
    });
  }

  const newMessage = { id: messages.length, name, message, email }; // Используем длину массива в качестве id
  messages.push(newMessage);

  res.json({ success: true, message: "Сообщение успешно отправлено!", id: newMessage.id });
});

app.delete("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);

  if (isNaN(messageId) || messageId < 0 || messageId >= messages.length) {
    return res.status(404).json({
      error: "Недопустимый идентификатор сообщения.",
    });
  }

  messages.splice(messageId, 1);

  res.json({ success: true, message: "Сообщение успешно удалено!" });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
