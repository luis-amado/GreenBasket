import { MongoClient } from 'mongodb';
const connectionString = process.env.ATLAS_URI || "mongodb+srv://user:Pa55word123@cluster0.64rfgzn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

let conn;
try {
	conn = await client.connect();
	console.log("Connected to MongoDB");
} catch (e) {
	console.error(e);
}

let db = conn.db("GreenBasket");

export default db;