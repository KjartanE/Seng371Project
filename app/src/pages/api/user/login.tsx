const bcrypt = require("bcryptjs")
import type { NextApiRequest, NextApiResponse } from "next"
import { usersRepo } from "../../../helpers/api/user-repo"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  const user = usersRepo.find((u: any) => u.email === email)

  // validate
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "email or password is incorrect"
  }

  // return basic user details and token
  return res.status(200).json({
    id: user.id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    // token,
  })
}
