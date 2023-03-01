const fs = require("fs")
import excuteQuery from "../../lib/db"

export const usersRepo = {
  getAll: () => getAll(),
  // getById: (id: number) =>
  //   users.find((x: any) => x.id.toString() === id.toString()),
  find: (x: any) => find(x),
  findEmail: (x: any) => findEmail(x),
  create,
  // update,
  // delete: _delete,
}

export interface IUsers {
  login_id: number
  user_id: number
  user_last_name: string
  user_first_name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
}

const getAll = async () => {
  try {
    const result = await excuteQuery(`SELECT * FROM users`, [])
    return result
  } catch (error) {
    console.log(error)
  }
}

const find = async (username: string) => {
  try {
    const result = await excuteQuery("SELECT * FROM login WHERE username = ?", [
      username,
    ])
    return result[0]
  } catch (error) {
    console.log(error)
  }
}

const findEmail = async (email: string) => {
  try {
    const result = await excuteQuery("SELECT * FROM login WHERE email = ?", [
      email,
    ])
    return result
  } catch (error) {
    console.log(error)
  }
}

async function create(user: any) {
  console.log("user", user)
  try {
    const result = await excuteQuery("INSERT INTO login VALUES(?)", [
      user.username,
      user.hash,
      user.email,
    ])
    console.log("result", result)
    return result
  } catch (error) {
    console.log(error)
  }
}

// function update(id: number, params: any) {
//   const user = users.find((x: any) => x.id.toString() === id.toString())

//   // set date updated
//   user.dateUpdated = new Date().toISOString()

//   // update and save
//   Object.assign(user, params)
//   saveData()
// }

// // prefixed with underscore '_' because 'delete' is a reserved word in javascript
// function _delete(id: number) {
//   // filter out deleted user and save
//   users = users.filter((x: any) => x.id.toString() !== id.toString())
//   saveData()
// }

// // private helper functions

// function saveData() {
//   fs.writeFileSync("data/users.json", JSON.stringify(users, null, 4))
// }
