import User from "../models/user.js";

export function getUser(userId) {
  return User.findById(userId);
}