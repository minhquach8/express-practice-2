const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
	try {
		const tours = await Tour.find();
		res.status(200).json({
			status: "success",
			// results: tours.length,
			data: { tours },
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error.message,
		});
	}
};

const getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				tour,
			},
		});
		console.log(req.params.id);
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error.message,
		});
	}
};

const createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				tour: newTour,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			message: error.message,
		});
	}
};

const updateTour = async (req, res) => {
	try {
		const updateTour = await Tour.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				runValidators: true,
				new: true,
			}
		);
		res.status(200).json({
			status: "success",
			data: {
				tour: updateTour,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			data: {
				message: error.message,
			},
		});
	}
};

const deleteTour = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: "fail",
			data: {
				message: error.message,
			},
		});
	}
};

module.exports = {
	getAllTours,
	createTour,
	getTour,
	updateTour,
	deleteTour,
};
