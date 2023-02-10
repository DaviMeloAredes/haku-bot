import 'dotenv/config';
import mongoose from 'mongoose';
import dbConfig from './dbConfig';

const { DB_PASS, DB_USER, DB_NAME } = process.env;

class DatabaseController {
  public uri: string;

  constructor() {
    this.uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_NAME}.un7ia.mongodb.net/?retryWrites=true&w=majority`;
  }

  private config() {
    dbConfig();
  }

  private connect() {
    mongoose.connect(this.uri).then(() => console.log('DB - CONNECTED'));
  }

  public startup() {
    this.config();
    this.connect();
  }

  public async close() {
    await mongoose.connection.close();
  }
}

export default new DatabaseController();
