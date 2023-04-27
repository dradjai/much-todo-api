import { db } from "./dbConnect.js";

const coll = db.collection('users');

export async function addNewUser(req, res) {
  let newUser = req.body;
  newUser.email = newUser.email.toLowerCase();
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

