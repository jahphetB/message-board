const { Router } = require("express");
const messageController = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", messageController.getMessages);
indexRouter.get("/new", messageController.getNewMessageForm);
indexRouter.post("/new", messageController.createMessage);
indexRouter.get("/messages/:messageId", messageController.getMessage);

module.exports = indexRouter;