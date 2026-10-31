const db = require("../db/queries");

async function getMessages(req, res) {
	const messages = await db.getAllMessages();

	res.render("index", {
		title: "Mini Message Board",
		messages: messages
	});
}

function getNewMessageForm(req, res) {
	res.render("form", { title: "New Message" });
}

async function createMessage(req, res) {
	const { messageUser, messageText } = req.body;

	if (
		typeof messageUser !== "string" ||
		typeof messageText !== "string"
	) {
		return res.status(400).send("Name and message must be text.");
	}

	const user = messageUser.trim();
	const text = messageText.trim();

	if (!user || !text) {
		return res.status(400).send("Name and message are required.");
	}

	if (user.length > 100 || text.length > 2000) {
		return res.status(400).send(
			"Name must be 100 characters or fewer and message 2000 characters or fewer."
		);
	}

	await db.insertMessage(user, text);

	res.redirect("/");
}

async function getMessage(req, res) {
	const { messageId } = req.params;
	const id = Number(messageId);

	if (
		!/^[1-9]\d*$/.test(messageId) ||
		!Number.isSafeInteger(id) ||
		id > 2147483647
	) {
		return res.status(404).send("Message not found");
	}

	const message = await db.getMessageById(id);

	if (!message) {
		return res.status(404).send("Message not found");
	}

	res.render("message", {
		title: "Message Details",
		message: message
	});
}

module.exports = {
	getMessages,
	getNewMessageForm,
	createMessage,
	getMessage
};