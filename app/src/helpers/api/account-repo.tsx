import excuteQuery from "../../lib/db"

export interface IAccount {
  user_id: number
  account_id: number
  checking: number
  savings: number
  credit: number
  credit_limit: number
}
export const accountRepo = {
  getRecord: (x: any) => getRecordByLoginId(x),
}

const getRecordByLoginId = async (
  accountId: number
): Promise<IAccount | undefined> => {
  try {
    const result = await excuteQuery(
      `
      SELECT * FROM accounts 
      LEFT JOIN users on accounts.user_id = users.user_id 
      WHERE users.login_id = ?;
      `,
      [accountId]
    )
    if (result && result[0]) {
      return result[0]
    }
  } catch (error) {
    console.log(error)
  }
}
