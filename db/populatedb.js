const pool = require("./pool");

async function main() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS messages (
			id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			text TEXT NOT NULL,
			"user" VARCHAR(100) NOT NULL,
			added TIMESTAMPTZ NOT NULL DEFAULT NOW()
		);
	`);

	await pool.query(`
		INSERT INTO messages (text, "user")
		SELECT text, author
		FROM (
			VALUES
				('Hi there!', 'Amando'),
				('Hello World!', 'Charles')
		) AS samples(text, author)
		WHERE NOT EXISTS (SELECT 1 FROM messages);
	`);

	console.log("Messages table is ready.");
}

main()
	.catch((error) => {
		console.error("Database setup failed:", error);
		process.exitCode = 1;
	})
	.finally(() => pool.end());