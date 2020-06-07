const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreciptationModel = mongoose.model(
	"Preciptation",
	new Schema({
		prec: {}
	})
);

module.exports = PreciptationModel;
