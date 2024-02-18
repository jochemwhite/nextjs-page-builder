import { Client, Databases, Account, Storage, Teams } from "appwrite";

const client = new Client();

client.setEndpoint("https://appwrite.jochemwhite.nl/v1").setProject("658fab9280f434656e3b");

const database = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);
const team = new Teams(client);

export { client, database, account, storage, team };
