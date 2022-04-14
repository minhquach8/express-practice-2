require("dotenv").config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB)
	// .connect(process.env.DATABASE_LOCAL)
	.then(() => {
		console.log("DB connected!");
	});

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
