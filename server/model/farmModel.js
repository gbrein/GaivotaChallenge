const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FarmModel = mongoose.model(
	"Farm",
	new Schema({
		farm_id: String,
		name: String,
		latitude: Number,
		longitude: Number,
		culture: String,
		variety: String,
		total_area: String,
		yield_estimation: String,
		price: String,
		geo_json: {}
	})
);

module.exports = FarmModel;
