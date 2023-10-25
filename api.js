import express from "express";
import { ObjectId } from 'mongodb';
import db from "./db.js";

const router = express.Router();

/*
req.body: {
	name: string
	logo: string
	address: string
	products: []
} 
*/
router.post("/productor", async (req, res) => {
	let collection = await db.collection("productores");
	let newDocument = req.body;
	let result = await collection.insertOne(newDocument);
	res.send(result).status(204);
})


// Ver todos los productores disponibles
router.get("/productor", async (req, res) => {
	let collection = await db.collection("productores");
	let results = await collection.find({})
	.limit(20)
	.map(doc => {
			return {
				name: doc.name,
				logo: doc.logo,
				_id: doc._id
			};
		})
		.toArray();
	res.send(results).status(200);
});

// Ver todos los productos de un productor
router.get("/productor/:id", async (req, res) => {
	let collection = await db.collection("productores");
	let result = await collection.findOne({_id: new ObjectId(req.params.id)});
	res.send(result.products).status(200);
});

/*
req.body: {
	"productorId": "string",
	"productId": number
	"quantity": number
}
*/
router.post("/user/:id", async (req, res) => {
	const query = {_id: new ObjectId(req.params.id)};
	const updates = {
		$push: {basket: req.body}
	}
	let collection = await db.collection("users");
	let result = await collection.updateOne(query, updates);
	res.send(result).status(200);
})

// Ver los productos del carro
router.get("/user/:id", async (req, res) => {
	let collection = await db.collection("users");
	let result = await collection.findOne({_id: new ObjectId(req.params.id)});
	res.send(result.basket).status(200);
})

/*
req.body: {
	name: string,
	address: string,
	basket: []
}
*/
router.post("/user", async (req, res) => {
	let collection = await db.collection("users");
	let newDocument = req.body;
	let result = await collection.insertOne(newDocument);
	res.send(result).status(204);
})

/*
req.body: {
	id: number,
	name: string,
	logo: string,
	price: number,
	priceUnit: string,
	description: string
}
*/
router.post("/product/:id", async (req, res) => {
	const query = {_id: new ObjectId(req.params.id)};
	const updates = {
		$push: {products: req.body}
	}
	let collection = await db.collection("productores");
	let result = await collection.updateOne(query, updates);
	res.send(result).status(200);
});

export default router;