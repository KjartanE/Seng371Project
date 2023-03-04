import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../context/UserContext"
import { useAcc } from "@/context/AccountContext"
import { Button } from "@mui/material"
import { useRouter } from "next/router"

export default function Main() {
  const userContext = useAuth()
  const accountContext = useAcc()

  const router = useRouter()

  const user = userContext.currentUser()
  // console.log('userContext', userContext);
  // console.log('userContext.currentUser()', userContext.currentUser());

  const account = accountContext.currentAccount()
  // console.log('account', account);

  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          Welcome to PiggyBank {user?.username || ""}
        </div>
        <div className={styles.mainButtons}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/bankPages/accounts")
            }}
          >
            Accounts
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/bankPages/budgets")
            }}
          >
            Budgets
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/bankPages/payments")
            }}
          >
            Payments
          </Button>
        </div>

        <div className={styles.description}>
          checking {account?.checking || ""}
        </div>
        <div className={styles.description}>
          savings {account?.savings || ""}
        </div>
        <div className={styles.description}>credit {account?.credit || ""}</div>
        <div className={styles.description}>
          credit limit {account?.credit_limit || ""}{" "}
        </div>
      </main>
    </>
  )
}
