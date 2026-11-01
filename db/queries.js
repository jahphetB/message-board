const pool = require("./pool");

async function getAllMessages() {
	const { rows } = await pool.query(
		'SELECT id, text, "user", added FROM messages ORDER BY added, id'
	);

	return rows;
}

async function getMessageById(id) {
	const { rows } = await pool.query(
		'SELECT id, text, "user", added FROM messages WHERE id = $1',
		[id]
	);

	return rows[0];
}

async function insertMessage(user, text) {
	await pool.query(
		'INSERT INTO messages ("user", text) VALUES ($1, $2)',
		[user, text]
	);
}

async function deleteMessage(id) {
	const { rowCount } = await pool.query(
		"DELETE FROM messages WHERE id = $1",
		[id]
	);

	return rowCount > 0;
}

async function updateMessage(id, user, text) {
	const { rowCount } = await pool.query(
		'UPDATE messages SET "user" = $1, text = $2 WHERE id = $3',
		[user, text, id]
	);

	return rowCount > 0;
}

module.exports = {
	getAllMessages,
	getMessageById,
	insertMessage,
	deleteMessage,
	updateMessage
};