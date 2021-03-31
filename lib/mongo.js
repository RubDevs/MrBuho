const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config");
const debug = require("debug")("app:mongo");

const MONGO_URI = process.env.DB_CONNECTION;
const DB_NAME = config.db_name;

class Mongolib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.db_name = DB_NAME;
  }

  async connect() {
    if (!Mongolib.connection) {
      try {
        await this.client.connect();
        debug("Connected to DB");
        return this.client.db(this.db_name);
      } catch (error) {
        debug(error);
      }
    }
    return Mongolib.connection;
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect();
      return await db.collection(collection).find(query).toArray();
    } catch (error) {
      debug(error);
    }
  }

  async get(collection, id) {
    try {
      const db = await this.connect();
      return await db.collection(collection).findOne({ _id: ObjectId(id) });
    } catch (error) {
      debug(error);
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect();
      return await db.collection(collection).insertOne(data);
    } catch (error) {
      debug(error);
    }
  }

  async update(collection, id, data) {
    try {
      const db = await this.connect();
      return await db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    } catch (error) {
      debug(error);
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect();
      return await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    } catch (error) {
      debug(error);
    }
  }
}

module.exports = Mongolib;
