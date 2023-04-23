import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addNewItem, deleteItem, getAllItems, updateItem } from "./src/items.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/items", addNewItem);
app.get("/items", getAllItems);
app.patch("/items/:itemId", updateItem);
app.delete("/items/:itemId", deleteItem)



export const api = functions.https.onRequest(app);