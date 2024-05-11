const express = require('express')
const app = express()
const dotenv = require('dotenv')
const database = require('./config/database')
// const { MongoClient } = require('mongodb')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/User')
const SiteRoutes = require('./routes/SiteRoute')


dotenv.config()
// const url = process.env.MONGO_URI;
// const client = new MongoClient(url);
// const dbName = 'passManager';

const PORT = process.env.PORT || 3000;

database.connect();

// Middleware
app.use(express.json())
app.use(cookieParser());
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use("/api/v1/auth", userRoutes);
app.use("/api", SiteRoutes);

// app.get("/",(req,res) => {
//   return res.json({
//       success : true,
//       message : "Your server is up and running..."
//   });
// });

// GET a password
// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const findResult = await collection.find({}).toArray();
//   res.json(findResult)
// })

// // SAVE a password
// app.post('/', async (req, res) => {
//   const password = req.body;
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const finalResult = await collection.insertOne(password);
//   res.send({ success: true, Result: finalResult });
// })

// // DELETE a password by ID
// app.delete('/', async (req, res) => {
//   const password = req.body;
//   const db = client.db(dbName);
//   const collection = db.collection('passwords');
//   const finalResult = await collection.deleteOne(password);
//   res.send({ success: true, Result: finalResult });
// })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})