import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addNewItem, deleteItem, getAllItems, updateItem } from "./src/items.js";
import { addNewUser, loginUser } from "./src/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/items/:userId", addNewItem);
app.get("/items/:userId", getAllItems);
app.patch("/items/:userId/:itemId", updateItem);
app.delete("/items/:userId/:itemId", deleteItem);

app.post("/signup", addNewUser);
app.post("/login", loginUser);


export const api = functions.https.onRequest(app);