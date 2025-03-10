import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67bb62ef0024072d71ba"); // Use your Project ID

export const account = new Account(client);
export const database = new Databases(client);
export { ID };
