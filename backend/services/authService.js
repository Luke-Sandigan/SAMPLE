import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  findByUsername,
  create,
  toPublic,
} from "../models/user.js";

const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const registerUser = async (username, password, role = "user") => {
  if (findByUsername(username)) {
    throw httpError(409, "Username already taken");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = create({
    username,
    password: hashed,
    role,
  });

  return toPublic(user);
};

const loginUser = async (username, password) => {
  const user = findByUsername(username);

  const valid =
    user && (await bcrypt.compare(password, user.password));

  if (!valid) {
    throw httpError(401, "Invalid username or password");
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export { registerUser, loginUser };