import excuteQuery from "../../lib/db"

/**
 * User Repository is a file that is the only access to the data base for user information
 * This file should be used to access/create/delete/edit any user data
 * This file is used in conjuction with UserContext to support the login functionality
 */
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

/**
 * Get all user in the login table.
 * Test function, wouldnt be used regularly
 *
 * @return {*}
 */
const getAll = async () => {
  try {
    const result = await excuteQuery(`SELECT * FROM login;`, [])
    return result
  } catch (error) {
    console.log(error)
  }
}

/**
 * Find user is useful to access and compare user details for login
 *
 * @param {string} username
 * @return {*}
 */
const find = async (username: string) => {
  try {
    const result = await excuteQuery(
      "SELECT `username`,`password`, `email` FROM login WHERE `username` = ?;",
      [username]
    )
    if (result && result[0]) {
      return result[0]
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Find email is used during signup, to check if an email is already in use
 *
 * @param {string} email
 * @return {*}
 */
const findEmail = async (email: string) => {
  try {
    const result = await excuteQuery("SELECT * FROM login WHERE email = ?;", [
      email,
    ])
    if (result) {
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Create function is used for the signup, to insert a new user record into the db
 *
 * @param {*} user
 * @return {*}
 */
async function create(user: any) {
  try {
    const result = await excuteQuery(
      "INSERT INTO `login`(`username`,`password`, `email`) VALUES(?,?,?);",
      [user.username, user.hash, user.email]
    )
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
