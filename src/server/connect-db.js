import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || process.env.LOCAL_URI || `mongodb://localhost:27017/pluralsight-jmroy`;
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {useNewUrlParser: true});
  db = client.db();
  return db;
}
