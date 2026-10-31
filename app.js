const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send("Something went wrong. Please try again.");
});

app.listen(PORT, (error) => {
	if (error) {
		throw error;
	}

	console.log(`Server running on port http://localhost:${PORT}/`);
});