const db = require("../db/queries");

async function getMessages(req, res) {
	const messages = await db.getAllMessages();

	res.render("index", {
		title: "Mini Message Board",
		messages: messages
	});
}

function getNewMessageForm(req, res) {
	res.render("form", {
		title: "New Message",
		message: null
	});
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

async function deleteMessage(req, res) {
	const { messageId } = req.params;
	const id = Number(messageId);

	if (
		!/^[1-9]\d*$/.test(messageId) ||
		!Number.isSafeInteger(id) ||
		id > 2147483647
	) {
		return res.status(404).send("Message not found");
	}

	const deleted = await db.deleteMessage(id);

	if (!deleted) {
		return res.status(404).send("Message not found");
	}

	res.redirect("/");
}

function parseMessageId(value) {
	const id = Number(value);

	if (
		!/^[1-9]\d*$/.test(value) ||
		!Number.isSafeInteger(id) ||
		id > 2147483647
	) {
		return null;
	}

	return id;
}

async function getEditMessageForm(req, res) {
	const id = parseMessageId(req.params.messageId);

	if (id === null) {
		return res.status(404).send("Message not found");
	}

	const message = await db.getMessageById(id);

	if (!message) {
		return res.status(404).send("Message not found");
	}

	res.render("form", {
		title: "Edit Message",
		message: message
	});
}

async function updateMessage(req, res) {
	const id = parseMessageId(req.params.messageId);

	if (id === null) {
		return res.status(404).send("Message not found");
	}

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

	const updated = await db.updateMessage(id, user, text);

	if (!updated) {
		return res.status(404).send("Message not found");
	}

	res.redirect(`/messages/${id}`);
}

module.exports = {
	getMessages,
	getNewMessageForm,
	createMessage,
	getMessage,
	deleteMessage,
	getEditMessageForm,
	updateMessage
};