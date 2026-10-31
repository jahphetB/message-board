const { AsyncLocalStorage } = require("node:async_hooks");
const { Pool } = require("pg");

const databaseContext = new AsyncLocalStorage();
let localPool;

function getPool() {
	const requestPool = databaseContext.getStore();

	if (requestPool) {
		return requestPool;
	}

	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is required");
	}

	if (!localPool) {
		localPool = new Pool({
			connectionString: process.env.DATABASE_URL
		});

		localPool.on("error", (error) => {
			console.error("Database connection error:", error);
		});
	}

	return localPool;
}

module.exports = {
	query(text, values) {
		return getPool().query(text, values);
	},

	end() {
		return localPool ? localPool.end() : Promise.resolve();
	},

	withPool(pool, callback) {
		return databaseContext.run(pool, callback);
	}
};

