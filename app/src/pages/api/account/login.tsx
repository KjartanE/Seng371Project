const bcrypt = require("bcryptjs")
import type { NextApiRequest, NextApiResponse } from "next"
import { usersRepo } from "../../../helpers/api/user-repo"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body

  const user = await usersRepo.find(username)
  console.log('user', user);

  //validate
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "username or password is incorrect"
  }

  // return basic user details and token
  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
  })
}
