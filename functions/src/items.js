import { db } from "./dbConnect.js";

const coll = db.collection('tasks');

export async function addNewItem(req, res) {
  const newItem = req.body
  await coll.add(newItem)
  // now return the whole (updated) list...
  getAllItems(req, res)

}

export async function getAllItems(req, res) {
  const { userId } = req.params;
  const itemsMessy = await coll.where("userId", "==", userId).get()
  const itemsClean = itemsMessy.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  res.send(itemsClean)
}

export async function updateItem(req, res) {
  const {itemId} = req.params;
  const updatedValues = req.body;

  await coll.doc(itemId).update(updatedValues);
  getAllItems(req, res);

}

export async function deleteItem(req, res) {
  const {itemId} = req.params;
  
  await coll.doc(itemId).delete();
  getAllItems(req, res);
}