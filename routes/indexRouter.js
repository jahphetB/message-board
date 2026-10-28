const { Router } = require("express");

const indexRouter = Router();

const messages = [
	{
		text: "Hi there!",
		user: "Amando",
		added: new Date()
	},
	{
		text: "Hello World!",
		user: "Charles",
		added: new Date()
	}
];

indexRouter.get("/", (req, res) => {
	res.render("index", {
		title: "Mini Message Board",
		messages: messages
	});
});

indexRouter.get("/new", (req, res) => {
	res.render("form", { title: "New Message" });
});

indexRouter.post("/new", (req, res) => {
	const { messageUser, messageText } = req.body;

	messages.push({
		user: messageUser,
		text: messageText,
		added: new Date()
	});

	res.redirect("/");
});

indexRouter.get("/messages/:messageId", (req, res) => {
	const { messageId } = req.params;

	// Accept only non-negative whole-number indexes.
	if (!/^(0|[1-9]\d*)$/.test(messageId)) {
		return res.status(404).send("Message not found");
	}

	const message = messages[Number(messageId)];

	if (!message) {
		return res.status(404).send("Message not found");
	}

	res.render("message", {
		title: "Message Details",
		message: message
	});
});

module.exports = indexRouter;