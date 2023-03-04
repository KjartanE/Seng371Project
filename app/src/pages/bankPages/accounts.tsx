import Head from "next/head"
import styles from "@/styles/Home.module.css"
import { useAuth } from "../../context/UserContext"
import { Button } from '@mui/material';
import { useRouter } from "next/router"

export default function Main() {
  const userContext = useAuth()
  const router = useRouter()

  const user = userContext.currentUser()
  console.log('userContext', userContext);
  console.log('userContext.currentUser()', userContext.currentUser());


  return (
    <>
      <Head>
        <title>Piggy Bank</title>
        <meta name="description" content="Piggy Bank bank account" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/piggy-bank.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Button variant="contained" onClick={() => {
            router.push("/main")
          }}>Back</Button>
        </div>
        <div className={styles.description}>{user?.username || ""}, here are your account balences</div>
      </main>
    </>
  )
}
