const { Router } = require("express");
const messageController = require("../controllers/messageController");

const indexRouter = Router();

indexRouter.get("/", messageController.getMessages);
indexRouter.get("/new", messageController.getNewMessageForm);
indexRouter.post("/new", messageController.createMessage);
indexRouter.get("/messages/:messageId", messageController.getMessage);
indexRouter.post(
	"/messages/:messageId/delete",
	messageController.deleteMessage
);

indexRouter.get(
	"/messages/:messageId/edit",
	messageController.getEditMessageForm
);

indexRouter.post(
	"/messages/:messageId/edit",
	messageController.updateMessage
);

module.exports = indexRouter;