const express = require("express");
const body_parser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const { PORT, JWT_PW } = process.env;
const CryptoJS = require("crypto-js");
const FarmModel = require("../model/farmModel");
const UserModel = require("../model/userModel");
const PreciptationModel = require("../model/preciptation");
const NdviModel = require("../model/ndvi");
const app = express();

const mongoose = require("mongoose");

module.exports = mongoose
	.connect(process.env.MONGOURI, { useNewUrlParser: true })
	.then(x => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);
	})
	.catch(err => {
		console.error("Error connecting to mongo", err);
	});

app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
app.post("/login", (req, res) => {
	let token;
	const { email, password } = req.body;
	UserModel.findOne({ email, password })
		.then(result => {
			if (result !== null) {
				token = jwt.sign(result.toJSON(), JWT_PW);
				res.status(200).send({ userData: result, token });
			} else {
				res.status(401);
			}
		})
		.catch(error => console.error(error));
});

app.get("/auth", (req, res) => {
	let token = req.header("Authorization");
	token = token.split(" ")[1];
	const ok = jwt.verify(token, JWT_PW);
	res.status(200).send(ok);
});

app.get("/", (req, res) => {
	res.status(200).send("Gaivota Test");
});

app.get("/farms", (req, res) => {
	FarmModel.find().then(result => {
		res.status(200).send(result);
	});
});

app.get("/farm/:id", (req, res) => {
	const id = req.params.id;
	FarmModel.find({ farm_id: id }).then(result => {
		res.status(200).send(result);
	});
});

app.post("/new-farms", (req, res) => {
	const data = req.body;
	const entries = Object.entries(data);
	entries.forEach(element => {
		const eachData = element[1];
		const farm_id = eachData.farm_id;
		FarmModel.findOne({ farm_id }).then(farm => {
			if (farm) {
				FarmModel.findOneAndUpdate({ farm_id }, { ...eachData }).then();
			}
			if (!farm) {
				farm = new FarmModel({
					farm_id: eachData.farm_id,
					name: eachData.name,
					latitude: eachData.latitude,
					longitude: eachData.longitude,
					culture: eachData.culture,
					variety: eachData.variety,
					total_area: eachData.total_area,
					yield_estimation: eachData.yield_estimation,
					price: eachData.price,
					geo_json: false
				});
				farm.save(err => {
					if (err) {
						console.log(err);
					} else {
						return farm;
					}
				});
			} else {
				return farm;
			}
		});
	});
	res.status(201).send("ok");
});

app.delete("/farm", (req, res) => {
	const { id } = req.query;
	FarmModel.findOne({ farm_id: id })
		.remove()
		.then(() => {
			res.status(204);
		});
});

app.post("/preciptation", (req, res) => {
	const data = req.body;
	let preciptation = new PreciptationModel({ prec: data });
	preciptation.save(err => {
		if (err) {
			console.log(err);
		} else {
			return preciptation;
		}
	});
	res.status(201).send("ok");
});

app.get("/preciptation", (req, res) => {
	PreciptationModel.find().then(result => {
		res.status(200).send(result);
	});
});

app.post("/ndvi", (req, res) => {
	const data = req.body;
	let ndvi = new NdviModel({ ndvi: data });
	ndvi.save(err => {
		if (err) {
			console.log(err);
		} else {
			return ndvi;
		}
	});
	res.status(201).send("ok");
});

app.get("/ndvi", (req, res) => {
	NdviModel.find().then(result => {
		res.status(200).send(result);
	});
});

app.post("/encript/:id", (req, res) => {
	const { id } = req.params;
	const base = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(id));
	res.send(base);
});

app.post("/decript/", (req, res) => {
	const { data } = req.body;
	const base = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
	res.send(base);
});

app.listen(PORT !== "undefined" ? PORT : 5000, () => {
	console.warn("App is running at http://localhost:" + PORT);
});

module.exports = app;
