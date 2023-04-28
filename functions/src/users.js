import { FieldValue } from 'firebase-admin/firestore';
import { db } from "./dbConnect.js";

const coll = db.collection('users');

export async function addNewUser(req, res) {
  const { email, password } = req.body;
  if(!email || password.length < 4) {
    res.status(400).send({ message: "Email and password required and the length must be greater than 3."})
    return 
  }

  const newUser = {
    email: email.toLowerCase(),
    password,
    createdAt: FieldValue.serverTimestamp(),
  }
  await coll.add(newUser);
  res.status(201).send({message: "Registered"});

}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const users = await coll
    .where("email", "==", email.toLowerCase())
    .where("password", "==", password)
    .get()
  if(users.docs.length < 1) {
    res.status(403).send({ message: 'Invalid username or password', success: false });
    return;
  }
  let user = users.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0];
  delete user.password;
  res.send(user);
}

