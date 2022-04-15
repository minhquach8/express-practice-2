const AppError = require("./utils/appError");
const globalErrorHandler = require("./errors/errorController");
const express = require("express");
const morgan = require("morgan");

const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError("This url is not found", 404));
});

app.use(globalErrorHandler);

module.exports = app;
