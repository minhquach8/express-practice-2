const fs = require("fs");
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");

const DB = process.env.DATABASE.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB)
	// .connect(process.env.DATABASE_LOCAL)
	.then(() => console.log("DB connected"));

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

const importData = async () => {
	try {
		await Tour.create(tours);
		console.log("Add Successfully");
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Tour.deleteMany();
		console.log("Delete Successfully");
	} catch (error) {
		console.log(error);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
