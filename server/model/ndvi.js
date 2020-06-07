const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NdviModel = mongoose.model(
	"Ndvi",
	new Schema({
		ndvi: {}
	})
);

module.exports = NdviModel;
